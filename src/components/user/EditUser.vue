<template>
  <el-dialog
    title="修改用户"
    :visible="visible"
    @update:visible="handleVisibleChange"
    width="50%"
    @close="editDialogClosed"
  >
    <!-- 对话框主体区域 -->
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="70px"
    >
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleVisibleChange(false)">取 消</el-button>
      <el-button type="primary" @click="editUserInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'editUser',
  props: {
    // 是否显示表单
    visible: {
      type: Boolean,
      default: false
    },
    // 弹窗的title
    title: String,
    // 回显数据
    model: {
      type: Object,
      default: null
    },
    callBack:{
      type: Function,
      default: null
    }
  },
  data() {
    //验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        return cb()
      }
      //返回一个错误提示
      cb(new Error('请输入合法的邮箱'))
    }
    //验证手机号码的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      //返回一个错误提示
      cb(new Error('请输入合法的手机号码'))
    }
    return {
      //控制修改用户对话框的显示与否
      editUserVisible: false,
      //修改用户的表单数据
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      //修改表单的验证规则对象
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            message: '邮箱格式不正确，请重新输入',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            validator: checkMobile,
            message: '手机号码不正确，请重新输入',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  watch: {
    // 监听 编辑时回显表单
    model(employeeInfo) {
      this.editForm = { ...employeeInfo } // 简单的浅克隆
    }
  },
  methods: {
    editDialogClosed() {
      this.editUserVisible = false
      this.$refs.editFormRef.resetFields()
      console.log('editDialogClosed')
      console.log(this.model)
    },
    handleVisibleChange(value) {
      this.$emit('update:visible', value)
      console.log('handleVisibleChange')
    },
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整用户信息')
        //发送请求完成修改用户的操作
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          this.editForm
        )
        //判断如果修改失败，就做提示
        if (res.meta.status !== 200) return this.$message.error('修改用户失败')
        //修改成功的提示
        this.$message.success('修改用户成功')
        //关闭对话框
       this.handleVisibleChange(false)


        //重新请求最新的数据
        // this.getUserList()
        console.log(this.callBack)
        if(this.callBack){

            this.callBack()
        }
            
      })
    }
  }
}
</script>
