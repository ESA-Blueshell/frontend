<script setup>
const props = defineProps([
  'username',
  'status',
  'avatarUrl',
  'halfWidth',
  'customText',
])
</script>

<template>
  <v-col
    v-if="!customText"
    class="discord-member-entry"
    cols="6"
    sm="4"
    :md="halfWidth ? 6 : 3"
  >
    <div class="discord-member-image-wrapper">
      <img
        :alt="`${username}'s avatar`"
        :src="avatarUrl"
        class="discord-member-image"
      >
      <span
        class="discord-member-status"
        :class="{ 'discord-member-online': status==='online', 'discord-member-idle': status==='idle', 'discord-member-dnd': status==='dnd' }"
      />
    </div>
    <span
      class="discord-member-name text-caption"
      v-text="username"
    />
  </v-col>


  <v-col
    v-else
    class="discord-member-entry"
    cols="auto"
  >
    <span
      class="discord-member-name"
      v-text="customText"
    />
  </v-col>
</template>

<style scoped>

.discord-member-entry {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 6px 0;
  padding: 0 16px;
}

.discord-member-image-wrapper {
  width: 32px;
  height: 32px;
  position: relative;
  margin-right: 4px;
}

.discord-member-image {
  width: 32px;
  height: 32px;
  border-radius: 16px;
}

.discord-member-status {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  border: 1px solid #1E1E1E;
  position: absolute;
  bottom: 0;
  right: 0;
}

.discord-member-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: white;
}


.discord-member-online {
  background-color: hsl(139, 47.4%, 38%);
}

.discord-member-idle {
  background-color: hsl(38, 77%, 43%);
}

.discord-member-dnd {
  background-color: hsl(359, 66.7%, 54.1%);
}
</style>
