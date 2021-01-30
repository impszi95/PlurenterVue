<template>
  <div>
<div class="lds-dual-ring"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-left: 10px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width:40px;
  height: 40px;
  border-radius: 50%;
  border: 6px solid darkgrey;
  border-color: rgb(72, 199, 116) transparent rgb(72, 199, 116) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>