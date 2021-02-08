<template>
  <div>
    <div class="field_c">
            <b-field label="Location" />
            <b-button
            rounded
            disabled
            size="is-small"
            outlined
            class="btn_edit"
            type="is-info"
            @click="EditLocation()"
          >
            <b-icon
              class="file-icon"
              icon="pencil"
            ></b-icon>
          </b-button>
          </div>
    <b-field>
      <b-field>
        <b-input
          placeholder="Country"
        >
        </b-input>
      </b-field>
      <b-field>
        <b-input
          placeholder="State"
        >
        </b-input>
      </b-field>
    </b-field>
      <b-field>
        <b-input
          placeholder="City"
        >
        </b-input>
      </b-field>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.field-body .field .field{
    width: 50%;
}
.btn_edit{
  width: 30px;
  height: 30px;
  margin-left: 10px;
  padding-bottom: 5px;  
  margin-top: -3px;
}

.field{
  margin-bottom: 10px;
}
.field_c {
  display: flex;
}
</style>