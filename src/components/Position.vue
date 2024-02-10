<template>
    <Renderer ref="renderer" style="width: 90%;">
      <Camera :position="{ z: 5 }" />
      <Scene>
        <PointLight :position="{ y: 50, z: 50 }" />
        <Box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
          <ToonMaterial />
        </Box>
      </Scene>
    </Renderer>
  </template>
  
  <script>
  export default {
    mounted() {
      const renderer = this.$refs.renderer;
      const box = this.$refs.box.mesh;
      renderer.onBeforeRender(() => {
        box.rotation.x -= 0.01;
        box.rotation.y += 0.01;
      });
    },
  };
  </script>