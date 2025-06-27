<script>
import MainHeader from "@/components/MainHeader.vue";
export default {
  name: "MainPage",
  components: {MainHeader}
}
</script>

<template>
  <main-header/>
  <v-main>
    <v-container class="pa-0" fluid>
      <v-img src="/back1.png" class="d-flex align-center justify-center" height="600" cover>
        <div class="text-center text-white px-6">
          <h2 class="text-h4 font-weight-bold mb-4 geologica">Добро пожаловать в <span class="font-weight-black">SMOM</span> - твоё сообщество для счастливой и осознанной беременности!</h2>
        </div>
      </v-img>

      <!-- О нас -->
      <v-container class="text-center py-16" style="max-width: 960px;" fluid>
        <p class="text-h5 font-weight-medium geologica" style="line-height: 1.8;">
          <span class="nauryz_redkeds">SMOM</span> — это новая разработка, созданная специально для молодых мам,<br>
          чтобы сделать путь к материнству более комфортным и понятным.<br>
          Здесь вы найдете советы экспертов, поддержку единомышленников и удобные инструменты<br>
          для планирования беременности и ухода за малышом.
        </p>
      </v-container>

      <v-container class="py-12">
        <v-row align="center" justify="center">
          <v-col cols="12" md="5">
            <div class="d-flex align-center justify-center rounded-lg pa-4">
              <VCalendar />
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="calendar-title mb-2 nauryz_redkeds" >КАЛЕНДАРЬ<br />БЕРЕМЕННОСТИ</h2>
            <p class="text-grey-darken-1 text-body-1">
              Календарь беременности помогает будущим мамам получать персонализированные рекомендации, отслеживать развитие малыша и записывать свои чувства.
            </p>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="py-12" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="10">
            <v-row align="start" justify="space-between" no-gutters>
              <!-- Левая часть -->
              <v-col cols="12" md="7" class="pr-md-4">
                <h2 class="text-h5 font-weight-bold mb-4 text-start nauryz_redkeds">Рекомендации и советы</h2>

                <p class="text-body-1 text-grey-darken-1 mb-8">
                  Мы собрали для тебя самые важные рекомендации от врачей, специалистов и других мам, чтобы
                  ты чувствовала себя уверенно и спокойно на каждом этапе беременности. Выбирай тему, читай советы,
                  задавай вопросы и находи ответы там, где тебе комфортно.
                </p>

                <v-row>
                  <v-col cols="6">
                    <v-img
                        src="/gl.png"
                        alt="image1"
                        height="175"
                        cover
                        class="rounded-lg"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-img
                        src="/gl.png"
                        alt="image2"
                        height="175"
                        cover
                        class="rounded-lg"
                    />
                  </v-col>
                </v-row>
              </v-col>

              <!-- Правая часть -->
              <v-col cols="12" md="5" class="mt-6 mt-md-0">
                <v-card color="#FFAED7" class="pa-4" rounded="xl" elevation="0">
                  <div class="d-flex gap-2 mb-4">
                    <v-btn variant="flat" color="white" class="text-black " rounded >Рекомендации</v-btn>
                    <v-btn variant="text" class="text-white">Советы</v-btn>
                  </div>

                  <div class="text-body-2 mb-4">
                    <span class="font-weight-medium">#питание</span>
                    <span class="ml-2" style="color: #a7427d">#физ.активность</span>
                    <span class="ml-2" style="color: #d04f9f">#1-ый триместр</span>
                  </div>

                  <v-list density="compact" class="bg-transparent">
                    <v-list-item class="mb-2 rounded-lg" style="background: white">
                      <template #prepend>
                        <v-icon color="pink">mdi-cup-water</v-icon>
                      </template>
                      <v-list-item-title>Не забывай пить воду</v-list-item-title>
                      <template #append>
                        <v-icon>mdi-arrow-right</v-icon>
                      </template>
                    </v-list-item>

                    <v-list-item class="mb-2 rounded-lg" style="background: white">
                      <template #prepend>
                        <v-icon color="blue">mdi-scale-balance</v-icon>
                      </template>
                      <v-list-item-title>Сбалансируйте рацион</v-list-item-title>
                      <template #append>
                        <v-icon>mdi-arrow-right</v-icon>
                      </template>
                    </v-list-item>

                    <v-list-item class="mb-2 rounded-lg" style="background: white">
                      <template #prepend>
                        <v-icon color="orange">mdi-food-off</v-icon>
                      </template>
                      <v-list-item-title>Избегайте вредные ...</v-list-item-title>
                      <template #append>
                        <v-icon>mdi-arrow-right</v-icon>
                      </template>
                    </v-list-item>

                    <v-list-item class="mb-2 rounded-lg" style="background: white">
                      <template #prepend>
                        <v-icon color="deep-orange">mdi-pill</v-icon>
                      </template>
                      <v-list-item-title>Помните о витаминах</v-list-item-title>
                      <template #append>
                        <v-icon>mdi-arrow-right</v-icon>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="py-12" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" md="10">
              <!-- Заголовок -->
              <h2 class="text-h5 font-weight-bold mb-2 nauryz_redkeds">МЕРОПРИЯТИЯ</h2>
              <p class="text-body-1 text-grey-darken-1 mb-8">
                Предлагаем будущим мамам информацию о полезных и интересных событиях: курсы по подготовке к родам, семинары по уходу за новорождённым, встречи с экспертами и мероприятия для общения.
              </p>

              <!-- Карточка 1 -->
              <v-card class="mb-6 pa-4" elevation="0" rounded="xl" border>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-img
                        src="/gl.png"
                        alt="Школа будущих мам"
                        height="160"
                        cover
                        class="rounded-lg"
                    />
                  </v-col>
                  <v-col cols="12" md="8">
                    <h3 class="text-subtitle-1 font-weight-bold">
                      Школа будущих мам: подготовка к родам и уходу за новорождённым
                    </h3>
                    <p class="text-body-2 mt-2 mb-3">
                      Приглашаем будущих мам на уникальное мероприятие, где вы сможете получить ценные знания и навыки, необходимые для успешного материнства.
                    </p>
                    <p class="text-body-2 font-weight-medium mb-1">
                      Дата и время проведения: <strong>25.05.25 в 16:00</strong>
                    </p>
                    <p class="text-body-2 font-weight-medium">
                      Место проведения: <span class="text-deep-pink">Красная площадь</span>
                    </p>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn icon color="pink" variant="flat" class="mt-n6 me-2">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>


              <!-- Карточка 2 -->
              <v-card class="pa-4" elevation="0" rounded="xl" border>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-img
                        src="gl.png"
                        alt="Йога для будущих мам"
                        height="160"
                        cover
                        class="rounded-lg"
                    />
                  </v-col>
                  <v-col cols="12" md="8">
                    <h3 class="text-subtitle-1 font-weight-bold">
                      Йога для будущих мам
                    </h3>
                    <p class="text-body-2 mt-2 mb-3">
                      Присоединяйтесь к нашему занятию по йоге для беременных, чтобы улучшить гибкость, снизить стресс и установить контакт с малышом в уютной атмосфере.
                    </p>
                    <p class="text-body-2 font-weight-medium mb-1">
                      Дата и время проведения: <strong>18.05.25 в 16:00</strong>
                    </p>
                    <p class="text-body-2 font-weight-medium">
                      Место проведения: <span class="text-deep-pink">Сретенский бульвар</span>
                    </p>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn icon color="orange" variant="flat" class="mt-n6 me-2">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>


      <!-- Call to Action -->
      <v-container class="text-center py-12">
        <h3 class="text-h5 font-weight-bold mb-4 nauryz_redkeds">Вступи в сообщество</h3>
        <p>Ты не одна. Здесь ты найдешь пространство, где поймут, поддержат и вдохновят.</p>
        <v-btn color="#FFAED7" class="mt-4" @click="$router.push('/registration')">Вступить в сообщество</v-btn>
      </v-container>
    </v-container>
  </v-main>
  <v-footer padless color="#222">
    <v-col class="text-center white--text py-6">
      <div class="text-h6 font-weight-bold">SMOM — забота с первых шагов</div>
      <div class="text-caption mt-2">© 2025 SMOM. Все права защищены.</div>
    </v-col>
  </v-footer>
</template>

<style scoped>
.calendar-image {
  height: 250px;
  border-radius: 12px;
}

.calendar-title {
  font-family: 'Unbounded', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.3;
  letter-spacing: 0;
}
.text-deep-pink {
  color: #D03C8B;
}

.geologica{
  font-family: 'Geologica';
}

.nauryz_redkeds{
  font-family: 'NauryzRedkeds';
}
*{
  font-family: 'Geologica';
}
</style>