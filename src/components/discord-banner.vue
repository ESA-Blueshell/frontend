<template>
  <div :style="{background: $vuetify.theme.computedThemes[$vuetify.theme.global.name].colors.wallpaper }">
    <v-container class="pa-0">
      <v-row
        class="mx-auto container flex-nowrap"
        align="center"
      >
        <v-col cols="auto" class="flex-shrink-1">
          <p
            class="text-white text-h5 text-sm-h4 font-weight-thin mb-0"
            style="float: left"
          >
            Join us on our Discord server
          </p>
        </v-col>
        <v-spacer/>
        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://discord.gg/23YMFQy"
            target="_blank"
          >
            <img :src="require('@/assets/discord.svg')" style="width: 35px" alt="discord icon"/>
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        v-if="discordData"
        class="mx-auto pt-4 ma-0 container"
      >
        <v-col
          cols="12"
          :md="Object.entries(channels).length > 0 ? 5 : 12"
        >
          <p class="text-h6 text-sm-h5 text--white mb-2">
            {{ discordData.presence_count }} people now online on discord
          </p>
          <div
            class="overflow-hidden"
            style="border: 1px solid #A8FF00;border-radius: 10px"
          >
            <div
              class="overflow-y-auto"
              style="max-height: 205px"
            >
              <v-container>
                <v-row style="justify-content: center">
                  <v-col
                    v-for="member in discordData.members"
                    :key="member.username"
                    class="discord-member-entry py-0"
                    cols="6"
                    sm="3"
                    :md="Object.entries(channels).length > 0 ? 5 : 2"
                  >
                    <div class="discord-member-image">
                      <img
                        :alt="`${member.username}'s avatar`"
                        :src="member.avatar_url"
                        class="discord-member-img"
                      >
                      <span
                        class="discord-member-status"
                        :class="{ 'discord-member-online': member.status==='online', 'discord-member-idle': member.status==='idle', 'discord-member-dnd': member.status==='dnd', }"
                      />
                    </div>
                    <span
                      class="discord-member-name text-caption"
                      v-text="member.username"
                    />
                  </v-col>
                  <v-col
                    v-if="discordData.members.length > 99"
                    class="discord-member-entry"
                    cols="6"
                    sm="3"
                    :md="Object.entries(channels).length > 0 ? 5 : 2"
                  >
                    <div class="text-white ml-7">
                      + {{ discordData.presence_count - discordData.members.length }} more
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
        </v-col>

        <v-spacer/>

        <v-col
          v-if="Object.entries(channels).length > 0"
          cols="12"
          md="5"
        >
          <p class="text-h5 text-white mb-2">
            Active public VCs
          </p>
          <v-container
            class="overflow-y-auto"
            style="max-height: 180px"
          >
            <v-row
              v-for="[channelId,channelName] in Object.entries(channels)"
              :key="channelId"
              class="mb-2"
              style="border: 1px solid #A8FF00;border-radius: 10px"
            >
              <div class="ml-4">
                <p class="text-h6 text-white font-italic font-weight-thin mb-0">
                  <v-icon
                    dark
                    size="20"
                    class="ma-0"
                  >
                    mdi-volume-high
                  </v-icon>
                  {{ channelName }}
                </p>
                <div>
                  <div
                    v-for="member in membersInVC[channelId]"
                    :key="member.username"
                    class="discord-member-entry"
                  >
                    <div class="discord-member-image">
                      <img
                        :alt="`${member.username}'s avatar`"
                        :src="member.avatar_url"
                        class="discord-member-img"
                      >
                      <span
                        class="discord-member-status"
                        :class="{ 'discord-member-online': member.status==='online', 'discord-member-idle': member.status==='idle', 'discord-member-dnd': member.status==='dnd', }"
                      />
                    </div>
                    <span
                      class="discord-member-name text-caption"
                      v-text="member.username"
                    />
                  </div>
                </div>
              </div>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "DiscordBanner",
  data: () => ({
    discordData: null,
    channels: {},
    membersInVC: {},
  }),
  mounted() {
    this.$http.get('https://discordapp.com/api/guilds/324285132133629963/widget.json')
      .then(response => {
        this.discordData = response.data
        this.shuffleArray(this.discordData.members)

        const membersInAChannel = this.discordData.members.filter(member => member.channel_id)

        this.discordData.channels.forEach(channel => {
          const membersInThisChannel = membersInAChannel.filter(member => member.channel_id === channel.id);
          if (membersInThisChannel.length > 0) {
            this.channels[channel.id] = channel.name
            this.membersInVC[channel.id] = membersInThisChannel
          }
        })


      })
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

  }
}
</script>

<style scoped>

.container {
  max-width: 1100px;
  height: 100%;
}

.v-btn {
  padding: 10px !important;
  width: 65px !important;
  height: 65px !important;
  min-width: 0 !important;
}

.v-icon {
  margin: 10px !important;
}

.discord-member-entry {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 10px;
  margin: 6px 0;
}

.discord-member-image {
  width: 32px;
  height: 32px;
  position: relative;
  margin-right: 4px;
}

.discord-member-img {
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
