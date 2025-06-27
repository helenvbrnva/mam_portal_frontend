<script>
import UserService from "@/store/user.service.js";
import moment from "moment/moment.js";
import CalendarService from "@/store/calendar.service.js";
import CreateCalendarForm from "@/components/Form/CreateCalendarForm.vue";
import CalendarForm from "@/components/Form/CalendarForm.vue";

export default {
  name: "UserEditProfilePage",
  components: {CalendarForm, CreateCalendarForm},
  data() {
    return {
      user: {
        email: null,
        id_type: 1,
        name: null,
        surname: null,
        patronymic: null,
        password: null,
        phone: null,
        icon: null,
        mood_emoji: '😊',
        city: '',
        birth_date: '',
      },
      password: {
        old: "",
        new: "",
        confirm: "",
      },
      dialogProfile: false,
      dialogPassword: false,
      dialogAvatar: false,
      validProfile: false,
      validPassword: false,


      surnameRule: [
        v => !!v || 'Фамилия не заполнена',
        v => /^[а-яА-ЯёЁ\s-]{2,20}$/.test(v) || 'Фамилия может содержать только русские символы и длинной от 2 до 21 символа'
      ],
      nameRule: [
        v => !!v || 'Имя не заполнена',
        v => /^[а-яА-ЯёЁ\s-]{2,20}$/.test(v) || 'Имя может содержать только русские символы и длинной от 2 до 21 символа'
      ],
      patronymicRule: [
        v => !!v || 'Отчество не заполнена',
        v => /^[а-яА-ЯёЁ\s-]{2,20}$/.test(v) || 'Отчество может содержать только русские символы и длинной от 2 до 21 символа'
      ],
      emailRule: [
        v => !!v || 'Почта обязательна',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Неверная почта',
      ],
      phoneRule: [
        v => !!v || 'Почта обязательна',
        v => /^(\+7|8)\d{10}$/.test(v) || 'телефон набран не правильно'
      ],

      passwordAddRule: [
        v => !!v || 'Пароль обязателен',
        v => /^.{4,32}$/.test(v) || 'Длина от 4 до 32 символов',
        v => /[a-z]/.test(v) || 'Хотя бы одна строчная буква',
        v => /[A-Z]/.test(v) || 'Хотя бы одна заглавная буква',
        v => /\d/.test(v) || 'Хотя бы одна цифра',
        v => /[!@#$%^&*]/.test(v) || 'Хотя бы один специальный символ'
      ],
      passwordUpdateRule: [
        v => (!v || /^.{4,32}$/.test(v)) || 'Длина от 4 до 32 символов',
        v => (!v || /[a-z]/.test(v)) || 'Хотя бы одна строчная буква',
        v => (!v || /[A-Z]/.test(v)) || 'Хотя бы одна заглавная буква',
        v => (!v || /\d/.test(v)) || 'Хотя бы одна цифра',
        v => (!v || /[!@#$%^&*]/.test(v)) || 'Хотя бы один специальный символ'
      ],
      passwordConfirmRule: [
        v => !!v || 'Пароль обязателен',
        v => (v === this.password.new) || 'Пароль не совпадает'
      ],
      rulesFile: [
        value => {
          return !value || !value.length || value[0].size < 2000000 || 'Подпись не может весить больше 2 MB!'
        },
      ],

      avatar: null,
      error: null,

      dialogAddItemCalendar: false,
      dialogUpdateItemCalendar: false,
      selectCalendarItem: null,
      calendar: {
        uuid: null,
        name: null,
        date_start: null,
        date_end: null
      },
      today: moment(new Date()).format("YYYY-MM-DD"),
      todayNow: moment(new Date()).format("DD.MM.YYYY"),
      events: [],
      isCreateCalendar: true,

      moodEmojis: ['😊', '😎', '🥰', '😢', '😇', '😴', '🤩'],

      snackbar: false,
      message: "",
    };
  },
  methods: {
    loadUser(){
      const user = this.$store.state.auth.user
      UserService.getUserByUuid(user.uuid).then(user => {
        Object.assign(this.user, user)
      })
    },
    async updateProfile(){
      const valid = await this.$refs.profileForm.validate()
      if(valid.valid){
        const user = this.$store.state.auth.user
        UserService.updateUser(user.uuid, this.user).then(user => {
          this.loadUser()
          this.dialogProfile = false
          this.snackbar = true
          this.error = "Даннык обновленны"
        })
      }
    },
    async changePassword(){
      const valid = await this.$refs.passwordForm.validate()
      if(valid.valid){
        UserService.updatePassword(this.password).then(user => {
          this.loadUser()
          this.dialogPassword = false
          this.password.new = null
          this.password.old = null
          this.password.confirm = null
          this.snackbar = true
          this.error = "Пароль обновлен"
        }).catch(error => {
          console.log(error)
          this.snackbar = true
          this.error = "Старый пароль неверный или пароли не совпадают"
        })
      }
    },
    uploadAvatar(){
      let form = new FormData()
      form.append("file", this.avatar)
      UserService.saveIcon(form).then(
          () => {
            this.snackbar = true
            this.message = "Аватар сохранен"
            this.avatar = null
            this.dialogAvatar = false
            this.loadUser()
          }
      ).catch(
          (request) => {
            this.snackbar = true
            this.error = request.response.data.message
          }
      )
    },
    loadCalendar(){
      this.events = []
      CalendarService.getCalendarByUuidUser().then((calendar) => {
        this.calendar = calendar
        this.events = Object.values(calendar.calendar).map(event => ({
          key: event.name,
          highlight: true,
          dates: new Date(event.date)
        }));
        this.isCreateCalendar = false
      }).catch(() => {
        this.isCreateCalendar = true
      })
    },
    addCalendarItem(form){
      form.append("date", this.today)
      CalendarService.addItemCalendar(this.calendar.uuid, form).then(() => {
        this.loadCalendar()
        this.dialogAddItemCalendar = false

        this.snackbar = true
        this.message = "Запись добавлена"
      })
    },
    updateCalendarItem(form){
      CalendarService.updateItemCalendar(this.calendar.uuid, this.today, form).then((response) => {
        this.loadCalendar()
        this.dialogUpdateItemCalendar = false
        this.selectCalendarItem = null

        this.snackbar = true
        this.message = "Запись обновлена"
      })
    },
    deleteCalendarItem(){
      CalendarService.deleteCalendarItem(this.calendar.uuid, this.today).then((response) => {
        this.loadCalendar()
        this.selectCalendarItem = null

        this.snackbar = true
        this.message = "Запись удалена"
      })
    },
    getDate(date) {
      this.today = date.id
      this.selectCalendarItem = this.calendar.calendar[date.id] || null
    },
    convertDescription(description){
      return description.replace(/\r\n|\r|\n/g, "<br>")
    },
    convertDate(date){
      return moment(date).format("DD.MM.YYYY")
    },
    calculatePregnancyDuration(start, current = new Date()) {
      const startDateObj = new Date(start)
      const currentDateObj = new Date(current)
      const diffTime = currentDateObj - startDateObj
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(diffDays / 7)
      const days = diffDays % 7

      return `${weeks} недель ${days} дней`
    },
    updateDuration(calendar) {
      if (!calendar.date_start) {
        return'Дата начала не указана'
      }
      return this.calculatePregnancyDuration(calendar.date_start)
    },
    calculateAge(birthDateString) {
      const today = new Date();
      const birthDate = new Date(birthDateString);

      let age = today.getFullYear() - birthDate.getFullYear();

      const hasHadBirthdayThisYear =
          today.getMonth() > birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

      if (!hasHadBirthdayThisYear) {
        age--;
      }

      return age;
    }
  },
  computed: {
    fullName(){
      if(this.user.name !== null)
        return `${this.user.surname} ${this.user.name} ${this.user.patronymic}`
      return "Нет"
    }
  },
  mounted() {
    this.loadUser()
    this.loadCalendar()
  }
}
</script>

<template>
  <v-snackbar
      :timeout="4000"
      v-model="snackbar"
  >
    {{error}}
  </v-snackbar>
  <v-container class="my-6 d-flex justify-center">
      <div class="pa-10">
        <h2 class="text-pink text-h5 font-weight-bold mb-6">Личный кабинет</h2>

        <v-row class="mb-6" align="start" no-gutters>
          <!-- Левая часть с аватаром и кнопками -->
          <v-col cols="12" md="3" class="mr-md-8">
            <v-img
                :src="user.icon"
                class="rounded-lg mb-3"
                aspect-ratio="1"
            ></v-img>
            <v-row>
            </v-row>
          </v-col>

          <!-- Правая часть -->
          <v-col cols="12" md="8" class="flex-grow-1">
            <v-row justify="space-between" align="start" no-gutters>
              <v-col cols="12" md="6">
                <p><b>Имя:</b> {{user.name}}</p>
                <p><b>Этап беременности:</b> <span class="font-weight-bold">{{ updateDuration(calendar) }}</span></p>
                <p><b>Возраст:</b> {{calculateAge(user.birth_date)}}</p>
                <p><b>Город:</b> {{user.city}}</p>
              </v-col>
              <v-col cols="12" md="5">
                <p><b>Настроение сегодня</b> {{user.mood_emoji}}</p>
                <p><b>Срок беременности</b></p>
                <v-chip color="pink lighten-4" class="ma-2">{{ updateDuration(calendar) }}</v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
                variant="text"
                class="pink--text"
                @click="dialogProfile = true"
                dense
                block
            >Редактировать профиль</v-btn>
          </v-col>
          <v-col>
            <v-btn
                variant="text"
                class="pink--text"
                @click="dialogPassword = true"
                dense
                block
            >Сменить пароль</v-btn>
          </v-col>
          <v-col>
            <v-btn
                variant="text"
                class="pink--text"
                @click="dialogAvatar = true"
                dense
                block
            >Изменить аватар</v-btn>
          </v-col>
        </v-row>

        <v-row v-if="isCreateCalendar === false">
          <v-col cols="12" md="12">
              <h3 class="text-pink font-weight-bold mb-4">Календарь беременности</h3>
              <v-row>
                <!-- Левый большой виджет -->
                <v-col cols="12" md="7">
                  <v-col cols="12" md="12">
                    <v-btn @click="dialogAddItemCalendar=true" :disabled="selectCalendarItem !== null"  variant="text">Добавить</v-btn>
                    <v-btn @click="dialogUpdateItemCalendar=true" :disabled="selectCalendarItem === null"  variant="text">Редактировать</v-btn>
                    <v-btn @click="deleteCalendarItem" :disabled="selectCalendarItem === null"  variant="text">Удалить</v-btn>
                  </v-col>
                    <VCalendar
                        transparent
                        borderless
                        expanded
                        @dayclick="getDate"
                        :attributes="events"
                    />
                </v-col>

                <!-- Правый блок с информацией -->
                <v-col cols="12" md="5">
                  <v-card class="pa-4" elevation="1" style="border-radius: 16px;" v-if="selectCalendarItem !== null">
                    <v-card-title class="font-weight-medium mb-2">Дата - {{convertDate(selectCalendarItem.date)}}</v-card-title>
                    <v-card-text>
                      <v-img :src="selectCalendarItem.img" height="100%" cover></v-img>
                      <p><strong>Название:</strong> {{selectCalendarItem.name}}</p>
                      <p><strong>Описание:</strong></p>
                      <p v-html="convertDescription(selectCalendarItem.description)"></p>
                    </v-card-text>
                  </v-card>
                  <v-card v-else>
                    <v-card-title>По данной дате пока нет записи</v-card-title>
                  </v-card>
                </v-col>
              </v-row>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" class="text-center">
            <p><strong>У вас нет активного календаря, вам необходимо создать календарь</strong></p>
            <CreateCalendarForm @create="loadCalendar"/>
          </v-col>
        </v-row>
      </div>

    <v-dialog v-model="dialogProfile" max-width="500px">
      <v-card>
        <v-card-title>Редактирование профиля</v-card-title>
        <v-card-text>
          <v-form ref="profileForm" v-model="validProfile">
            <!-- Основные поля -->
            <v-row dense>
              <v-col cols="12" sm="4">
                <v-text-field v-model="user.surname" label="Фамилия" outlined :rules="surnameRule" />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field v-model="user.name" label="Имя" outlined :rules="nameRule" />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field v-model="user.patronymic" label="Отчество" outlined :rules="patronymicRule" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field v-model="user.phone" label="Телефон" outlined :rules="phoneRule" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="user.email" label="Email" outlined :rules="emailRule" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field v-model="user.city" label="Город проживания" outlined />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="user.birth_date" label="Дата рождения" outlined type="date" />
              </v-col>
            </v-row>

            <!-- Эмоджи -->
            <v-row dense class="mt-4">
              <v-col cols="12">
                <p class="mb-2 font-weight-medium">Выберите настроение:</p>
                <v-btn-toggle v-model="user.mood_emoji" mandatory>
                  <v-btn v-for="emoji in moodEmojis" :key="emoji" :value="emoji" class="ma-1">
                    {{ emoji }}
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="dialogProfile = false">Отмена</v-btn>
          <v-btn color="primary" @click="updateProfile">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Диалог смены пароля -->
    <v-dialog v-model="dialogPassword" max-width="500px">
      <v-card>
        <v-card-title>Смена пароля</v-card-title>
        <v-card-text>
          <v-form ref="passwordForm" v-model="validPassword">
            <v-text-field v-model="password.old" label="Старый пароль" type="password" outlined :rules="passwordAddRule"/>
            <v-text-field v-model="password.new" label="Новый пароль" type="password" outlined :rules="passwordAddRule"/>
            <v-text-field v-model="password.confirm" label="Повторите новый пароль" type="password" outlined :rules="passwordConfirmRule"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="dialogPassword = false">Отмена</v-btn>
          <v-btn color="primary" @click="changePassword">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Диалог загрузки аватара -->
    <v-dialog v-model="dialogAvatar" max-width="500px">
      <v-card>
        <v-card-title>Изменение аватара</v-card-title>
        <v-card-text>
          <v-file-input :rules="rulesFile" show-size label="Загрузить новый аватар" accept="image/*" @change="uploadAvatar" outlined v-model="avatar"/>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="dialogAvatar = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogUpdateItemCalendar" max-width="800px">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <CalendarForm
                  :addMode="false"
                  :calendar-info="selectCalendarItem"
                  @update="updateCalendarItem"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAddItemCalendar" max-width="800px">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <CalendarForm
                  :addMode="true"
                  @add="addCalendarItem"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<style scoped>

</style>