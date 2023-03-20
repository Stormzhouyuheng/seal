<template>
    <div>
        <my-contextmenu target="#map" 
                        theme="dark" 
                        :data="menu" 
                        @click="handleContextmenu"></my-contextmenu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menu: [
                    {icon: 'el-icon-view', label: '刷新'},
                    {icon: 'el-icon-edit', label: '清除'},
                    {icon: 'el-icon-edit', label: '放大'},
                    {icon: 'el-icon-edit', label: '缩小'},
                    {icon: 'el-icon-edit', label: '全图'},
                    {icon: 'el-icon-edit', label: '搜索'},
                    {icon: 'el-icon-edit', label: '测距'},
                    {divider: true},
                    {
                        icon: 'el-icon-document', 
                        label: '画图',
                        children: [
                            {label: '二级菜单1'},
                            {label: '二级菜单2'},
                            {label: '二级菜单3'},
                            {label: '二级菜单4'}
                        ]
                    },
                    {
                        icon: 'el-icon-document', 
                        label: '图层',
                        children: [
                            {label: '二级菜单1'},
                            {label: '二级菜单2'},
                            {label: '二级菜单3'},
                            {label: '二级菜单4'}
                        ]
                    }
                ]
            }
        },
        methods: {
            handleContextmenu(item, vm) {
                console.log(item, vm);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>