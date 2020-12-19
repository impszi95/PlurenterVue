<template>
  <div>
         <form action="">
                <div class="modal-card">
                    <header @click="$emit('close')" class="modal-card-head">
                             <img class="image" v-bind:src="'data:image/jpg;base64,' + photo.image.data"/>          
                    </header>                   
                        <b-button rounded class="button is-danger" @click="$emit('delete')">
                            <b-icon class="file-icon" size="is-medium" icon="delete"></b-icon>
                        </b-button>
                   
                </div>
            </form>
  </div>
</template>

<script>
export default {
    props: ['photo'],
}
</script>

<style scoped>
.button{
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
   margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    padding:0;
}
.modal-card-foot{
    display:inline-block;
      width: 100%;
      padding:5px;
}
.modal-card-head{
    padding:0;
    border-bottom:none;

}
.modal-card{
     width: 100%;
    display:inline-block;
     margin-left: auto;
    margin-right: auto;
}
.img{
    width: 100%;
    position: relative;
    margin-left: auto;;
    margin-right: auto;
}
</style>