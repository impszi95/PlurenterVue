<template> 
  <div >
         <form action="">
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Delete this photo?</p>                      
                    </header>                   
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$emit('close')">No</button>
                         <div class="divider"/>
                        <button class="button is-danger" type="button" @click="$emit('delete')">Delete</button>
                    </footer>
                </div>
            </form>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.button{
  width: 100px;
   margin-left: auto;
    margin-right: auto;
}
.divider{
    height:auto;
    display:inline-block;
}
.modal-card-foot{
    display:inline-block;
      width: 280px;

}
.modal-card{
  width: 280px;
      display:inline-block;

  margin-left: auto;
    margin-right: auto;
}
</style>