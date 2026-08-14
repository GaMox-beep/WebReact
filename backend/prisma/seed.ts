import { PrismaClient, Role, NovelStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

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

  // 2. Seed Categories
  const categoriesData = [
    {
      name: 'Tiên Hiệp',
      slug: 'tien-hiep',
      description: 'Thể loại tu chân luyện đạo, phi thăng tiên giới, nghịch thiên cải mệnh vượt qua thiên kiếp.',
    },
    {
      name: 'Huyền Huyễn',
      slug: 'huyen-huyen',
      description: 'Thế giới huyền bí với ma pháp, đấu khí, võ hồn và những kỳ quan vô tận.',
    },
    {
      name: 'Đô Thị',
      slug: 'do-thi',
      description: 'Bối cảnh thế giới hiện đại, thương trường, dị năng ngầm hoặc trùng sinh khởi nghiệp.',
    },
    {
      name: 'Khoa Huyễn',
      slug: 'khoa-huyen',
      description: 'Khoa học viễn tưởng, không gian vũ trụ, người máy sinh học, tận thế và cơ giáp.',
    },
    {
      name: 'Võ Hiệp',
      slug: 'vo-hiep',
      description: 'Giang hồ nghĩa khí, kiếm hiệp ân oán tình thù, bí kíp võ công chấn động thiên hạ.',
    },
    {
      name: 'Kỳ Huyễn',
      slug: 'ky-huyen',
      description: 'Huyền bí phương Tây, kỵ sĩ, phù thủy, rồng thần, thần thoại Cthulhu và ma pháp cổ xưa.',
    },
    {
      name: 'Ngôn Tình',
      slug: 'ngon-tinh',
      description: 'Câu chuyện tình cảm sâu sắc, ngọt ngào, hài hước hoặc trắc trở cảm động lòng người.',
    },
    {
      name: 'Lịch Sử',
      slug: 'lich-su',
      description: 'Xuyên không về các triều đại lịch sử, mưu lược quân sự, tranh đoạt thiên hạ.',
    },
  ];

  const categoryMap = new Map<string, string>();

  for (const cat of categoriesData) {
    const saved = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: cat,
    });
    categoryMap.set(saved.slug, saved.id);
  }
  console.log(`✅ Seeded ${categoriesData.length} categories.`);

  // 3. Seed Sample Novels
  const sampleNovels = [
    {
      title: 'Đạo Quỷ Dị Tiên',
      slug: 'dao-quy-di-tien',
      authorName: 'Hồ Vĩ Bút',
      description: 'Quỷ dị Thiên Đạo, dị thường tiên phật, là thực sự? Là giả? Lâm vào hoang mang Lý Hỏa Vượng không cách nào phân biệt được thực và ảo trong cuộc tu hành điên dại.',
      status: NovelStatus.ONGOING,
      views: 185000,
      rating: 4.9,
      coverUrl: 'https://oeoibowqgtkikhscqmzr.supabase.co/storage/v1/object/public/covers/1786452659867-0txhtvv.jpg',
      categorySlugs: ['tien-hiep', 'huyen-huyen', 'ky-huyen'],
      chapters: [
        {
          chapterNumber: 1,
          title: 'Chương 1: Lò Luyện Đan',
          content: 'Khói mù lượn lờ trong động phủ âm u, từng đợt mùi thuốc nồng nặc xen lẫn mùi tanh kỳ quái phả vào mũi Lý Hỏa Vượng. Hắn mở choàng mắt, nhìn bốn phía chung quanh, chỉ thấy lò luyện đan bằng đồng xanh khổng lồ đang bốc cháy hừng hực...',
        },
        {
          chapterNumber: 2,
          title: 'Chương 2: Sư Phụ Giả Mạo',
          content: 'Lão đạo sĩ râu tóc bạc phơ bước tới, trên mặt nở nụ cười hiền từ nhưng trong mắt lại lóe lên tia sáng u ám khó lường. Lý Hỏa Vượng cố gắng trấn tĩnh, nắm chặt lòng bàn tay đang run rẩy...',
        },
      ],
    },
    {
      title: 'Phàm Nhân Tu Tiên',
      slug: 'pham-nhan-tu-tien',
      authorName: 'Vong Ngữ',
      description: 'Một thiếu niên bình thường xuất thân bần hàn, cơ duyên xảo hợp bước chân vào giang hồ tiểu môn phái, dấn thân vào con đường tu tiên đầy gian nan hiểm trở.',
      status: NovelStatus.COMPLETED,
      views: 950000,
      rating: 4.8,
      categorySlugs: ['tien-hiep', 'vo-hiep'],
      chapters: [
        {
          chapterNumber: 1,
          title: 'Chương 1: Sơn Thôn Thiếu Niên',
          content: 'Hàn Lập sinh ra trong một ngôi làng nhỏ dưới chân núi. Nhà nghèo nhiều miệng ăn, vì muốn giảm bớt gánh nặng gia đình, hắn quyết định theo Tam thúc đi tham gia khảo hạch nhập môn của Thất Huyền Môn...',
        },
      ],
    },
    {
      title: 'Quỷ Bí Chi Chủ',
      slug: 'quy-bi-chi-chu',
      authorName: 'Ái Tiềm Thủy Đích Ô Tặc',
      description: 'Trong làn sương mù mịt của kỷ nguyên hơi nước và máy móc, ma dược, bói toán, nguyền rủa, thẻ bài Tarot cùng những vị thần cổ xưa thì thầm trong bóng tối.',
      status: NovelStatus.COMPLETED,
      views: 820000,
      rating: 5.0,
      categorySlugs: ['ky-huyen', 'huyen-huyen', 'khoa-huyen'],
      chapters: [
        {
          chapterNumber: 1,
          title: 'Chương 1: Đỏ Thẫm',
          content: 'Cơn đau nhức nhối khiến Chu Minh Thụy từ từ tỉnh lại. Trước mắt hắn là căn phòng xa lạ kiểu Victoria, khẩu súng lục ổ quay đặt trên bàn làm việc và một vệt máu đỏ thẫm loang lổ trên bức tường phía sau...',
        },
      ],
    },
    {
      title: 'Vạn Cổ Thần Đế',
      slug: 'van-co-than-de',
      authorName: 'Phi Thiên Ngư',
      description: 'Tám trăm năm trước, Minh Đế chi tử Trương Nhược Trần bị vị hôn thê Trì Dao công chúa sát hại. Tám trăm năm sau, hắn tái sinh quyết tâm đòi lại tất cả.',
      status: NovelStatus.ONGOING,
      views: 640000,
      rating: 4.7,
      categorySlugs: ['huyen-huyen', 'tien-hiep'],
      chapters: [],
    },
    {
      title: 'Đại Phụng Đả Canh Nhân',
      slug: 'dai-phung-da-canh-nhan',
      authorName: 'Mại Báo Tiểu Lang Quân',
      description: 'Cảnh sát hình sự Hứa Thất An xuyên không về vương triều Đại Phụng, làm một đả canh nhân cầm chiêng phá án kỳ bí, khuấy đảo triều đình và giang hồ.',
      status: NovelStatus.COMPLETED,
      views: 520000,
      rating: 4.9,
      categorySlugs: ['lich-su', 'tien-hiep', 'vo-hiep'],
      chapters: [],
    },
    {
      title: 'Ta Có Một Tòa Khủng Bố Ốc',
      slug: 'ta-co-mot-toa-khung-bo-oc',
      authorName: 'Hội Thuyết Thoại Đích Trửu Tử',
      description: 'Trần Ca thừa kế nhà ma sắp phá sản của cha mẹ để lại, tình cờ phát hiện chiếc điện thoại đen mở ra các nhiệm vụ kinh dị thế giới thực tế.',
      status: NovelStatus.COMPLETED,
      views: 410000,
      rating: 4.8,
      categorySlugs: ['do-thi', 'ky-huyen'],
      chapters: [],
    },
    {
      title: 'Túc Mệnh Chi Hoàn',
      slug: 'tuc-menh-chi-hoan',
      authorName: 'Ái Tiềm Thủy Đích Ô Tặc',
      description: 'Phần 2 của thế giới Quỷ Bí Chi Chủ, tiếp nối câu chuyện tại vương quốc Intis đầy biến động và những nghi thức thần bí mới.',
      status: NovelStatus.ONGOING,
      views: 390000,
      rating: 4.7,
      categorySlugs: ['ky-huyen', 'huyen-huyen'],
      chapters: [],
    },
    {
      title: 'Đấu La Đại Lục',
      slug: 'dau-la-dai-luc',
      authorName: 'Đường Gia Tam Thiếu',
      description: 'Đường Môn ngoại môn đệ tử Đường Tam nhảy vực tạ tội, xuyên sinh sang Đấu La Đại Lục, thức tỉnh song sinh Vũ Hồn Lam Ngân Thảo và Hạo Thiên Chùy.',
      status: NovelStatus.COMPLETED,
      views: 890000,
      rating: 4.6,
      categorySlugs: ['huyen-huyen', 'vo-hiep'],
      chapters: [],
    },
    {
      title: 'Tu Chân Liêu Thiên Quần',
      slug: 'tu-chan-lieu-thien-quan',
      authorName: 'Thánh Kỵ Sĩ Đích Truyền Thuyết',
      description: 'Tống Thư Hàng vô tình được thêm vào một nhóm chat QQ quy tụ toàn các đại năng tu chân giả ngoài đời thực mà ban đầu hắn cứ ngỡ là nhóm cosplayer.',
      status: NovelStatus.COMPLETED,
      views: 460000,
      rating: 4.9,
      categorySlugs: ['do-thi', 'tien-hiep'],
      chapters: [],
    },
    {
      title: 'Trọng Sinh Chi Đô Thị Tu Tiên',
      slug: 'trong-sinh-chi-do-thi-tu-tien',
      authorName: 'Thập Lý Kiếm Thần',
      description: 'Độ kiếp kỳ đại tu sĩ Trần Phàm độ kiếp thất bại, trùng sinh về thời niên thiếu tại địa cầu, dùng sức mạnh tiên gia nghiền ép mọi hào môn thế gia.',
      status: NovelStatus.PAUSED,
      views: 310000,
      rating: 4.2,
      categorySlugs: ['do-thi', 'tien-hiep'],
      chapters: [],
    },
    {
      title: 'Toàn Chức Cao Thủ',
      slug: 'toan-chuc-cao-thu',
      authorName: 'Hồ Điệp Lam',
      description: 'Tuyển thủ Esports huyền thoại Diệp Tu bị câu lạc bộ ruồng bỏ, làm quản lý ca đêm tại một quán net nhỏ, bắt đầu hành trình trở lại đỉnh vinh quang trong tựa game Vinh Quang.',
      status: NovelStatus.COMPLETED,
      views: 670000,
      rating: 4.9,
      categorySlugs: ['do-thi', 'khoa-huyen'],
      chapters: [],
    },
    {
      title: 'Linh Cảnh Hành Giả',
      slug: 'linh-canh-hanh-gia',
      authorName: 'Mại Báo Tiểu Lang Quân',
      description: 'Trương Nguyên Thanh nhận được một tấm thẻ sinh viên ma quái từ người bạn mất tích, kéo hắn vào Linh Cảnh - thế giới trò chơi siêu nhiên đầy rẫy hiểm nguy.',
      status: NovelStatus.ONGOING,
      views: 290000,
      rating: 4.6,
      categorySlugs: ['do-thi', 'khoa-huyen', 'ky-huyen'],
      chapters: [],
    },
    {
      title: 'Tuyết Trung Hãn Đao Hành',
      slug: 'tuyet-trung-han-dao-hanh',
      authorName: 'Phong Hỏa Hí Chư Hầu',
      description: 'Thế tử Bắc Lương Từ Phượng Niên gánh vác đại nghiệp gia tộc, rút kiếm dấn thân vào giang hồ hiểm ác và đao quang kiếm ảnh của chốn sa trường.',
      status: NovelStatus.COMPLETED,
      views: 580000,
      rating: 4.9,
      categorySlugs: ['vo-hiep', 'lich-su'],
      chapters: [],
    },
    {
      title: 'Thôn Phệ Tinh Không',
      slug: 'thon-phe-tinh-khong',
      authorName: 'Ngã Cật Tây Hồng Thị',
      description: 'Trái Đất trải qua thảm họa biến đổi gen R-virus, La Phong từ một chiến sĩ cơ sở từng bước vươn lên thành cường giả thống lĩnh tinh không vũ trụ.',
      status: NovelStatus.COMPLETED,
      views: 710000,
      rating: 4.7,
      categorySlugs: ['khoa-huyen', 'huyen-huyen'],
      chapters: [],
    },
    {
      title: 'Khánh Dư Niên',
      slug: 'khanh-du-nien',
      authorName: 'Miêu Nị',
      description: 'Thiếu niên Phạm Nhàn mang ký ức kiêm toàn thân phận bí ẩn bước vào kinh đô Nam Khánh, mưu lược đấu trí với những thế lực quyền mưu đen tối.',
      status: NovelStatus.COMPLETED,
      views: 630000,
      rating: 4.8,
      categorySlugs: ['lich-su', 'vo-hiep'],
      chapters: [],
    },
    {
      title: 'Tự Cẩm',
      slug: 'tu-cam',
      authorName: 'Đông Thiên Đích Liễu Diệp',
      description: 'Khương Tự trùng sinh trở về thời điểm trước khi thảm kịch xảy ra, nắm giữ vận mệnh trong tay, cải biến tương lai và tìm được chân ái của đời mình.',
      status: NovelStatus.COMPLETED,
      views: 340000,
      rating: 4.8,
      categorySlugs: ['ngon-tinh', 'lich-su'],
      chapters: [],
    },
    {
      title: 'Khó Dỗ Dành',
      slug: 'kho-do-danh',
      authorName: 'Trúc Dĩ',
      description: 'Câu chuyện tình yêu đầy ngọt ngào nhưng cũng lắm trắc trở giữa Ôn Dĩ Phàm và Tang Diên sau nhiều năm xa cách thời thanh xuân.',
      status: NovelStatus.COMPLETED,
      views: 480000,
      rating: 4.9,
      categorySlugs: ['ngon-tinh', 'do-thi'],
      chapters: [],
    },
    {
      title: 'Bí Ẩn Lâu Đài Đêm',
      slug: 'bi-an-lau-dai-dem',
      authorName: 'Tuyết Cung',
      description: 'Lâu đài cổ kính bị cô lập trên đỉnh đồi tuyết phủ, nơi ẩn giấu những bí mật nguyền rủa kéo dài hàng thế kỷ của một dòng họ quý tộc châu Âu.',
      status: NovelStatus.ONGOING,
      views: 120000,
      rating: 4.5,
      categorySlugs: ['ky-huyen'],
      chapters: [],
    },
  ];

  for (const novelData of sampleNovels) {
    const { categorySlugs, chapters, ...novelFields } = novelData;

    const novel = await prisma.novel.upsert({
      where: { slug: novelFields.slug },
      update: {
        title: novelFields.title,
        authorName: novelFields.authorName,
        description: novelFields.description,
        status: novelFields.status,
        views: novelFields.views,
        rating: novelFields.rating,
        coverUrl: novelFields.coverUrl || null,
      },
      create: {
        ...novelFields,
        coverUrl: novelFields.coverUrl || null,
      },
    });

    // Link Categories
    for (const catSlug of categorySlugs) {
      const categoryId = categoryMap.get(catSlug);
      if (categoryId) {
        await prisma.novelCategory.upsert({
          where: {
            novelId_categoryId: {
              novelId: novel.id,
              categoryId,
            },
          },
          update: {},
          create: {
            novelId: novel.id,
            categoryId,
          },
        });
      }
    }

    // Link Chapters if provided
    for (const ch of chapters) {
      await prisma.chapter.upsert({
        where: {
          novelId_chapterNumber: {
            novelId: novel.id,
            chapterNumber: ch.chapterNumber,
          },
        },
        update: {
          title: ch.title,
          content: ch.content,
        },
        create: {
          novelId: novel.id,
          chapterNumber: ch.chapterNumber,
          title: ch.title,
          content: ch.content,
          views: Math.floor(Math.random() * 5000) + 500,
        },
      });
    }
  }

  console.log(`✅ Successfully seeded ${sampleNovels.length} novels with multi-category relationships and sample chapters!`);
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
