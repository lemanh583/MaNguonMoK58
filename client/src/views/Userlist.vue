<template>
  <div class="content">
    <div></div>
    <div class="user-table">
      <a-table :columns="columns" :data-source="data" bordered>
        <template
          v-for="col in ['name', 'phone', 'role']"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="(e) => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">Save</a>
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="() => cancel(record.key)"
              >
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
                >Edit</a
              >
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: "15%",
    scopedSlots: { customRender: "phone" },
  },
  {
    title: "Role",
    dataIndex: "role",
    width: "20%",
    scopedSlots: { customRender: "role" },
  },
  {
    title: "Edit",
    dataIndex: "operation",
    width: "10%",
    scopedSlots: { customRender: "operation" },
  },
  {
    title: "Delete",
    dataIndex: "delete",
    width: "10%",
    scopedSlots: { customRender: "delete" },
  },
];

export default {
  data() {
    return {
      data: [],
      columns,
      editingKey: "",
    };
  },
  mounted() {
    Vue.axios.post("http://localhost:3002/api/user/list").then((response) => {
      this.data = response.data.data;
      console.log(response.data.data);
    });
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
  },
};
</script>
<style scoped>
.user-table {
  width: 90%;
  margin: auto;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>
