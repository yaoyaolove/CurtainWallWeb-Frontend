<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="首页"></UDashboardNavbar>
      <div class="main-page">
        <UPageGrid class="custom-margin">
          <UPageCard v-for="(module, index) in modulesLine1" :key="index" v-bind="module"
                     @click="checkPermissionAndRedirect(module)" class="hover-effect bg-blue-100 dark:bg-slate-800"   >
                     <template #icon>
                      <UIcon :name="module.icon" class="text-[48px] text-primary" />
                     </template>

                     <template #title>
                       <span class="text-[24px] font-bold">{{ module.title }}</span>
                     </template>

                     <template #description>
                       <span class="line-clamp-2">{{ module.description }}</span>
                     </template>
          </UPageCard>

          <UPageCard v-for="(module, index) in modulesLine2" :key="index" v-bind="module"
                     @click="checkPermissionAndRedirect(module)" class="hover-effect bg-blue-100 dark:bg-slate-800" >
                     <template #icon>
                      <UIcon :name="module.icon" class="text-[48px] text-primary" />
                     </template>

                     <template #title>
                       <span class="text-[24px] font-bold">{{ module.title }}</span>
                     </template>

                     <template #description>
                       <span class="line-clamp-2">{{ module.description }}</span>
                     </template>
          </UPageCard>
          <UPageCard v-for="(module, index) in modulesLine3" :key="index" v-bind="module"
                     @click="checkPermissionAndRedirect(module)" class="hover-effect bg-blue-100 dark:bg-slate-800" >
                     <template #icon>
                      <UIcon :name="module.icon" class="text-[48px] text-primary" />
                     </template>

                     <template #title>
                       <span class="text-[24px] font-bold">{{ module.title }}</span>
                     </template>

                     <template #description>
                       <span class="line-clamp-2">{{ module.description }}</span>
                     </template>
          </UPageCard>
          <UPageCard v-for="(module, index) in modulesLine4" :key="index" v-bind="module"
                     @click="checkPermissionAndRedirect(module)" class="hover-effect bg-blue-100 dark:bg-slate-800" >
            <template #description>
              <span class="line-clamp-2">{{ module.description }}</span>
            </template>
          </UPageCard>
          <UPageCard v-for="(module, index) in modulesLine5" :key="index" v-bind="module"
                     @click="checkPermissionAndRedirect(module)" class="hover-effect bg-blue-100 dark:bg-blue-800" >
            <template #description>
              <span class="line-clamp-2">{{ module.description }}</span>
            </template>
          </UPageCard>
        </UPageGrid>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup>
import axios from "axios";
import {ref, reactive} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter();
const userAuth = ref({});

//definePageMeta({
//  middleware: "auth",
//});


const modulesLine1 = reactive([
  {
    title: "3D建筑模型",
    description: "用于查看3D建筑模型，可视化反映建筑问题",
    target_address: "/3DModel",
    icon: "i-simple-icons-googlehome",
    permissionKey: "access_system_a",
  },
  {
    title: "石材污渍检测",
    description: "用于识别建筑石材幕墙表面污渍",
    target_address: "/stonedirty/mainpage",
    icon: "i-heroicons-fire",
    permissionKey: "access_system_b",
  },


]);

const modulesLine2 = reactive([
  // {
  //   title: "幕墙材质分割",
  //   description: "给定一张建筑幕墙图片，分割出其中的各种材质",
  //   target_address: "/segment",
  //   permissionKey: "access_system_f",
  //   icon: "i-simple-icons-homeassistantcommunitystore",
  // },
  {
    title: "石材裂缝检测",
    description: "用于识别建筑石材幕墙表面裂缝",
    target_address: "/crackdetect",
    permissionKey: "access_system_c",
    icon: "i-simple-icons-affinitypublisher",
  },
  {
    title: "幕墙振动数据检测与展示",
    description: "用于检测和展示幕墙的振动数据",
    target_address: "/vibration/dashboard",
    permissionKey: "access_system_v",
    icon: "i-simple-icons-tailwindcss",
  },

]);

const modulesLine3 = reactive([
  {
    title: "账号管理",
    description: "管理账号用户名及密码",
    target_address: "/accountManagement",
    permissionKey: "",
    icon: "i-heroicons-bell-alert",
  },
  {
    title: "用户管理",
    description: "管理用户权限",
    target_address: "/userManage",
    permissionKey: "manage",
    icon: "i-heroicons-book-open",
    disabled: true,
  },

  // {
  //   title: "幕墙韧性评估",
  //   description: "用于查看评估幕墙韧性",
  //   target_address: "/resilienceAssessment/dataUpload",
  //   permissionKey: "access_system_h",
  //   icon: "i-simple-icons-testcafe",
  // },

  // {
  //   title: "金属锈蚀检测",
  //   description: "用于检测金属锈蚀",
  //   target_address: "/corrosiondetection/detect",
  //   permissionKey: "access_system_z",
  //   icon: "i-simple-icons-amazons3",
  // },
]);
const loadingAuth = ref(true); // 新增loading状态

onMounted(async () => {
  await getUserAuth();
  loadingAuth.value = false; // 权限加载完成
});

const getUserAuth = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.warn("authToken不存在");
      userAuth.value = {};
      return;
    }
    const response = await axios.get("/api/account/custom/getPermissions", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    userAuth.value = response.data.data || {};
    console.log("userAuth:", userAuth.value);
  } catch (error) {
    console.error("获取权限失败:", error);
    userAuth.value = {};
  }
};

const checkPermissionAndRedirect = (module) => {
  if (loadingAuth.value) {
    ElMessage.warning("权限信息加载中，请稍后...");
    return; // 权限没加载完，阻止操作
  }
  if (module.permissionKey == "") {
    router.push({ path: module.target_address });
    return;
  }
  if (module.permissionKey == "manage" && userAuth.value.is_superuser) {
    router.push({ path: module.target_address });
    return;
  }
  if (userAuth.value.is_superuser || userAuth.value[module.permissionKey]) {
    router.push({ path: module.target_address });
  } else {
    ElMessage.error("您没有权限访问此模块");
  }
};
</script>

<style scoped>

/* 放大图标大小 */
::v-deep(.u-page-card .text-3xl) {
  font-size: 36px !important; /* 默认约为24px，这里放大到36px */
}

/* 放大标题字体 */
::v-deep(.u-page-card .text-primary) {
  font-size: 20px !important;
  font-weight: 700 !important;
}


.main-page {
  overflow: auto
}

.custom-margin {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); /* 这里280px是每列的最小宽度 */
  gap: 50px; /* 卡片间距 */
}

.hover-effect:hover {
  background-color: #f0f0f0;
  cursor: pointer;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.back-to-main-btn {
  margin: 5px;
  align-self: flex-end;
  /* 对齐到容器的左侧 */
}
</style>
