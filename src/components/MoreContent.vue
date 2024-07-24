<template>
  <div class="more-content">
    Aber Freund! wir kommen zu spät. Zwar leben die Götter,<br>
    Aber über dem Haupt droben in anderer Welt.<br>
    Weiß ich nicht und wozu Dichter in dürftiger Zeit?<br>
    <span class="author-info">Friedrich Hölderlin —— Brot und<br>Wein 7</span>
  </div>
</template>

<style lang="scss" scoped>
.more-content {
  position: relative;
  width: 100%;
  font-family: "Pacifico-Regular";
  font-size: 14px;
  font-weight: normal;
  margin-top: 12px;
  padding-bottom: 1.5em; // 为作者信息留出空间

  .author-info {
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: right;
    font-weight: bold;
    white-space: nowrap;
  }
</style>
