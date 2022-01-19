<template>
  <div class="content">
    <div class="header">
      <h2>User Management</h2>
    </div>
    <div>
      <a-button class="btn" type="primary" @click="showModal">
        Add User
      </a-button>
      <a-modal v-model="visible" title="Add User" on-ok="handleOk">
        <template slot="footer">
          <a-button key="back" @click="handleCancel"> Return </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
          >
            Submit
          </a-button>
        </template>
        <div class="label">Name</div>
        <input class="input" type="text" />
        <div class="label">Phone</div>
        <input class="input" type="text" />
        <div class="label">Role</div>
        <select class="input"></select>
      </a-modal>
    </div>

    <div class="ant-table">
      <a-table :columns="columns" :data-source="users" bordered>
        <template slot="id" slot-scope="id, record, index">
          {{ index + 1 }}
        </template>
        <template slot="operation">
          <div class="action">
            <button class="edit">Edit</button>
            <button class="delete" @click="deleteClick(user._id)">
              Delete
            </button>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const columns = [
  {
    title: "STT",
    width: "4%",
    dataIndex: "id",
    scopedSlots: { customRender: "id" },
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: "25%",
    scopedSlots: { customRender: "phone" },
  },
  {
    title: "Role",
    dataIndex: "name_role",
    width: "25%",
    scopedSlots: { customRender: "role" },
  },
  {
    title: "Action",
    dataIndex: "operation",
    width: "15%",
    scopedSlots: { customRender: "operation" },
  },
];
export default {
  data() {
    return {
      users: [],
      columns,
      modalTitle: "",
      UserName: "",
      UserId: 0,
      loading: false,
      visible: false,
    };
  },
  methods: {
    loadData() {
      axios.post("http://localhost:3002/api/user/list").then((response) => {
        this.users = response.data.data;
        console.log(this.users);
      });
    },
    addClick() {
      this.modalTitle = "Add User";
      this.UserId = 0;
      this.UserName = "";
    },
    editClick(user) {
      this.modalTitle = "Edit User";
      this.UserId = user._id;
      this.UserName = user.name;
    },
    createClick() {
      axios
        .post("http://localhost:3002/api/user/create", {
          UserName: this.name,
        })
        .then((response) => {
          this.loadData();
          alert(response.data.data);
        });
    },
    updateClick() {
      axios
        .put("http://localhost:3002/api/user/update/:id", {
          UserId: this._id,
          UserName: this.name,
        })
        .then((response) => {
          this.loadData();
          alert(response.data.data);
        });
    },
    deleteClick(_id) {
      if (!confirm("Are you sure?")) {
        return;
      }
      axios
        .delete("http://localhost:3002/api/user/delete/" + _id)
        .then((response) => {
          console.log("res-delete", response);
          // this.loadData();
          // alert(response.data.data);
        });
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
    },
    handleCancel() {
      this.visible = false;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style scoped>
.content {
  /* background-image: url("../assets/images/green.png"); */
  width: 100%;
}
.btn {
  float: right;
  width: 10%;
  margin: 20px 0 20px;
}
.header {
  width: 100%;
  text-align: center;
  padding-top: 20px;
}
.ant-table {
  width: 100%;
  margin: auto;
}
.action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.edit {
  color: #fff;
  cursor: pointer;
  background: green;
  border: 1px solid green;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}
.delete {
  color: #fff;
  cursor: pointer;
  background: red;
  border: 1px solid red;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}
.input {
  width: 90%;
  border-radius: 5px;
  height: 35px;
  border: 1px solid black;
}
</style>
