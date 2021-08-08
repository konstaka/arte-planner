<template>
  <div class="attackers_container">
    <CommandRow
      v-for="command of $store.state.commands"
      :key="`command${command._id}`"
      :command="command"
    />
  </div>
</template>

<script>
import CommandRow from '@/components/Commands/CommandRow';
export default {
  name: 'Commands',
  components: { CommandRow },
};
</script>

<style scoped>
.attackers_container {
  margin-bottom: 300px;
}

@media screen and (max-width: 1330px) {
  .attackers_container {
    overflow-x: scroll;
  }
}
</style>
