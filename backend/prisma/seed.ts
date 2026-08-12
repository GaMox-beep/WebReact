import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';


const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is missing.');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting Database Seeding...');

  // 1. Seed Default Admin User
  const adminEmail = 'admin@webnovel.com';
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: Role.ADMIN,
    },
    create: {
      email: adminEmail,
      username: 'admin',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log(`✅ Admin User Ready: ${admin.email} (Username: admin | Password: admin123 | Role: ${admin.role})`);

  // 2. Seed Default Categories
  const categories = [
    { name: 'Tiên Hiệp', slug: 'tien-hiep' },
    { name: 'Huyền Huyễn', slug: 'huyen-huyen' },
    { name: 'Đô Thị', slug: 'do-thi' },
    { name: 'Khoa Huyễn', slug: 'khoa-huyen' },
    { name: 'Võ Hiệp', slug: 'vo-hiep' },
    { name: 'Kỳ Huyễn', slug: 'ky-huyen' },
    { name: 'Ngôn Tình', slug: 'ngon-tinh' },
    { name: 'Lịch Sử', slug: 'lich-su' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
  }
  console.log(`✅ Seeded ${categories.length} default categories.`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
