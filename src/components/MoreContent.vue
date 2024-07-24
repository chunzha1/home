<template>
  <div class="more-content">
    <div class="poem-text">
      Aber Freund! wir kommen zu spät. Zwar leben die Götter,<br>
      Aber über dem Haupt droben in anderer Welt.<br>
      Weiß ich nicht und wozu Dichter in dürftiger Zeit?
    </div>
    <div class="author-info">
      <p>Friedrich Hölderlin —— Brot und<br>Wein 7</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.more-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  font-family: "Pacifico-Regular";
  font-size: 14px;
  font-weight: normal;
  margin-top: 12px;
}

.poem-text {
  flex: 1;
}

.author-info {
  text-align: right;
  white-space: nowrap;
  
  p {
    font-weight: bold;
    margin: 0;
  }
}
</style>
