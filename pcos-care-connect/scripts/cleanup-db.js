/**
 * cleanup-db.js
 * Run with: node scripts/cleanup-db.js
 * Removes duplicate users keeping the most recent one per email,
 * and drops the broken unique index so Mongoose can recreate it cleanly.
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pcos-care-connect';

async function main() {
  console.log('🔗 Connecting to MongoDB...');
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();

  // ── 1. Fix duplicate users ──────────────────────────────────────────────
  console.log('\n📋 Checking for duplicate users...');
  const users = await db.collection('users').find({}).toArray();
  const seen = {};
  const toDelete = [];

  for (const user of users) {
    const key = user.email?.toLowerCase().trim();
    if (!key) continue;
    if (seen[key]) {
      // Keep the newer record, delete the older one
      const existing = seen[key];
      if (new Date(user.createdAt) > new Date(existing.createdAt)) {
        toDelete.push(existing._id);
        seen[key] = user;
      } else {
        toDelete.push(user._id);
      }
    } else {
      seen[key] = user;
    }
  }

  if (toDelete.length > 0) {
    const result = await db.collection('users').deleteMany({ _id: { $in: toDelete } });
    console.log(`✅ Removed ${result.deletedCount} duplicate user(s).`);
  } else {
    console.log('✅ No duplicate users found.');
  }

  // ── 2. Normalise all emails to lowercase ───────────────────────────────
  console.log('\n📝 Normalising email addresses...');
  const allUsers = await db.collection('users').find({}).toArray();
  let normalised = 0;
  for (const user of allUsers) {
    if (user.email && user.email !== user.email.toLowerCase().trim()) {
      await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { email: user.email.toLowerCase().trim() } }
      );
      normalised++;
    }
  }
  console.log(`✅ Normalised ${normalised} email(s).`);

  // ── 3. Drop & recreate the email index cleanly ─────────────────────────
  console.log('\n🔧 Rebuilding email unique index...');
  try {
    await db.collection('users').dropIndex('email_1');
    console.log('   Dropped old index.');
  } catch {
    console.log('   No existing email_1 index to drop.');
  }
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  console.log('✅ Email unique index rebuilt.');

  // ── 4. Summary ─────────────────────────────────────────────────────────
  const finalCount = await db.collection('users').countDocuments();
  console.log(`\n🎉 Done! ${finalCount} clean user(s) remaining in database.`);

  await client.close();
}

main().catch(err => {
  console.error('❌ Cleanup failed:', err.message);
  process.exit(1);
});
