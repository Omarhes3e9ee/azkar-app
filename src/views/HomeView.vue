<template>
  <div class="container mx-auto p-6">
    <div class="text-center mb-8">
      <h1 class="text-5xl font-bold text-gray-800 mb-4">تطبيق القرآن</h1>
      <p class="text-xl text-gray-600">تجربة قراءة وتعلم القرآن الكاملة</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- بطاقة السور -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/surah')">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">📖</span>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800">السور</h3>
            <p class="text-sm text-gray-600">جميع الـ 114 سورة</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4">تصفح واقرأ جميع سور القرآن مع النص العربي والترجمات والتلاوة الصوتية.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">القرآن الكامل</span>
          <span class="text-green-600">→</span>
        </div>
      </div>

      <!-- بطاقة الأجزاء -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/juz')">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">📚</span>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800">الأجزاء</h3>
            <p class="text-sm text-gray-600">30 جزء</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4">تصفح الأجزاء الـ 30 للقرآن مع معلومات وتفاصيل لكل جزء.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">تقسيمات القرآن</span>
          <span class="text-blue-600">→</span>
        </div>
      </div>

      <!-- بطاقة الترجمة -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/translation')">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">🌍</span>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800">الترجمة</h3>
            <p class="text-sm text-gray-600">لغات متعددة</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4">قارن الترجمات باللغة الإنجليزية والعربية والإندونيسية مع عرضها بجانب بعضها البعض.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">3 لغات</span>
          <span class="text-purple-600">→</span>
        </div>
      </div>

      <!-- بطاقة التجويد -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/tajweed')">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">🎵</span>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800">التجويد</h3>
            <p class="text-sm text-gray-600">قواعد التلاوة</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4">تعلم قواعد التلاوة القرآنية مع المؤشرات البصرية والشرح التفصيلي.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">تعليم بصري</span>
          <span class="text-yellow-600">→</span>
        </div>
      </div>

      <!-- بطاقة الصوت -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/surah/001')">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">🔊</span>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800">الصوت</h3>
            <p class="text-sm text-gray-600">تلاوة الآيات</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4">استمع إلى التلاوة الصوتية عالية الجودة للآيات القرآنية مع أدوات التحكم في التشغيل.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">جودة MP3</span>
          <span class="text-red-600">→</span>
        </div>
      </div>

      <!-- بطاقة الأذكار -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/azkar')">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">🙏</span>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800">الأذكار</h3>
            <p class="text-sm text-gray-600">الأدعية اليومية</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4">احصل على الأذكار اليومية والأدعية مع التلاوة الصوتية.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">صلوات يومية</span>
          <span class="text-indigo-600">→</span>
        </div>
      </div>

      <!-- بطاقة الاختبار -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="navigateTo('/test')">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
            <span class="text-2xl">🧪</span>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800">الاختبارات</h3>
            <p class="text-sm text-gray-600">التشخيصات</p>
          </div>
        </div>
        <p class="text-gray-700 mb-4">نفذ اختبارات شاملة للتحقق من جميع الميزات ومسارات الملفات والوظائف.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">صحة النظام</span>
          <span class="text-gray-600">→</span>
        </div>
      </div>
    </div>

    <!-- إحصائيات سريعة -->
    <div class="mt-12 bg-white border border-gray-200 rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">الإحصائيات السريعة</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600">114</div>
          <div class="text-sm text-gray-600">سورة</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600">30</div>
          <div class="text-sm text-gray-600">جزء</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-purple-600">3</div>
          <div class="text-sm text-gray-600">لغات</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-red-600">∞</div>
          <div class="text-sm text-gray-600">ملفات صوتية</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'HomeView',
  setup() {
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    return {
      navigateTo
    };
  }
};
</script>

<style scoped>
.home-page {
  font-family: 'Cairo', sans-serif;
  background: linear-gradient(to bottom, #f0fff4, #ffffff);
}

.home-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2f855a;
  margin-bottom: 1rem;
}

.home-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
  max-width: 800px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #38a169;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.feature-stats {
  background: #f7fafc;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #38a169;
  font-weight: 500;
}

.stat-item {
  padding: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #38a169;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #718096;
  font-size: 0.875rem;
}
</style>
