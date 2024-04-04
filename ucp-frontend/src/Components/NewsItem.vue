<template>
  <div class="news-item">
    <div class="news-date">
      <span class="value" v-if="!editable">{{ date || 'Nincs adat...' }}</span>
      <input type="date" v-model="date" v-if="editable" class="value">

      <input type="button" @click="toggleEditMode()" :class="!editable ? 'editBtn' : 'saveBtn'" :value="editable ? 'Mentés' : 'Szerkesztés'" v-if="AccountStore.getLoggedUser && AccountStore.getLoggedUser.accountData.role == 'admin'">
      <input type="button" @click="deleteNews()" class="deleteBtn" value="Törlés" v-if="AccountStore.getLoggedUser && AccountStore.getLoggedUser.accountData.role == 'admin' && !editable">
    </div>
    <div class="news-title" v-if="!editable" v-html="title || 'Nincs adat...'"></div>
    <input type="text" class="news-title" v-model="title" v-if="editable">
    <div class="news-context" v-html="context || 'Nincs adat...'" v-if="!editable"></div>
    <textarea class="news-context" rows="10" v-model="context" v-if="editable"></textarea>
  </div>
</template>

<script setup>
  import { ref, toRefs } from 'vue'
  import { serverURL } from '@/main'
  import { useAccountStore } from '@/Stores/AccountStore.js'

  // Declarations
  const AccountStore = useAccountStore()

  const props = defineProps({
    data: {
      newsID: Number,
      title: String,
      date: String,
      context: String
    }
  })

  const { newsID, date, title, context } = toRefs(props.data)

  const editable = ref(false)

  const toggleEditMode = async () => {
    if (editable.value) {
      try {
        await fetch(`${serverURL}/news/${newsID.value}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: title.value, date: date.value, context: context.value })
        })
      } catch (err) {
        console.error(`Error fetching "news" table! (Err: ${err})`)
        throw new Error('Internal server error')
      }
    }

    editable.value = !editable.value
  }

  const deleteNews = async () => {
    try {
      await fetch(`${serverURL}/news_delete/${newsID.value}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        location.reload();
      })
    } catch (err) {
      console.error(`Error fetching "news" table! (Err: ${err})`)
      throw new Error('Internal server error')
    }
  }
</script>

<style lang="scss" scoped>
  .news-item {
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: start;

    padding: 10px;
    border-radius: 5px;

    background-color: #171717;

    .news-date {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      width: 100%;

      .value {
        margin-right: auto;
        color: black;

        font-size: 0.6rem !important;
        font-weight: 500 !important;

        padding: 3px !important;
        border-radius: 5px !important;

        background-color: white;
      }

      .editBtn {
        background-color: rgb(236, 195, 30) !important;
      }

      .saveBtn {
        background-color: rgb(47, 188, 108) !important;
      }

      .deleteBtn {
        background-color: rgb(188, 47, 47) !important;
      }

      .editBtn, .saveBtn, .deleteBtn {
        padding: 5px 7px !important;

        position: relative;

        color: white !important;
      }
    }

    .news-title {
      width: 100%;

      margin-top: 15px;
      font-size: 0.9rem;
    }

    .news-context {
      width: 100%;

      margin-top: 20px;

      font-size: 0.8rem;
      line-height: 1.1rem;
      text-align: justify;
    }
  }
</style>