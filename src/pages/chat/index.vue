<template>
  <div class="chat">
    <el-container direction="vertical" class="chat-container">
      <el-header class="chat-header">
        <h1>OPEN TALK</h1>
      </el-header>
      <el-main>
        <ChatTalkWindow />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.chat {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-container {
  height: auto;
  max-height: 90%;
  width: 70%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chat-header {
  background-color: #409eff;
  color: white;
  text-align: center;
  padding: 15px 0;
  font-size: 1.5em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<route lang="yaml">
meta:
  layout: bare
</route>
