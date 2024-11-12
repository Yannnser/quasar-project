<script setup lang="ts">
import { ref, watch, computed, reactive, useTemplateRef, onMounted } from 'vue';
import {
  useElementBounding,
  useElementByPoint,
  useMouse,
  useEventListener,
  useThrottleFn,
} from '@vueuse/core';

const 拓展光标 = useTemplateRef('拓展光标');
const { x: 鼠标坐标X, y: 鼠标坐标Y } = useMouse({
  type: 'client',
});
const 拓展鼠标模式 = ref(false);
const X偏移阈值 = ref(40);
const Y偏移阈值 = ref(30);
const X拓展距离 = ref(300);
const Y拓展距离 = ref(300);
const 目标偏移X = ref(0);
const 目标偏移Y = ref(0);
const x = ref(0);
const y = ref(0);

const { element } = useElementByPoint({ x, y });
const bounding = reactive(useElementBounding(element));
const 计算目标偏移 = (原始偏移, 阈值, 正偏移, 负偏移) => {
  if (原始偏移 <= -阈值) return 负偏移;
  if (原始偏移 >= 阈值) return 正偏移;
  return 0;
};

watch(element, () => {
  if (
    element.value instanceof SVGElement ||
    element.value instanceof SVGPathElement ||
    element.value instanceof SVGSVGElement ||
    element.value instanceof HTMLSpanElement
  ) {
    element.value = element.value.parentElement;
  }
});

const 计算最终坐标 = (坐标, 偏移, 最小值, 最大值) => {
  const 最终坐标 = 坐标 + 偏移;
  return Math.max(最小值, Math.min(最大值, 最终坐标));
};

const 选中样式 = computed(() => {
  const time = bounding.width > 200 || bounding.height > 200 ? 0.25 : 0.1;
  const same = {
    width: `${bounding.width}px`,
    height: `${bounding.height}px`,
    transform: `translate(calc(${bounding.left}px), calc(${bounding.top}px))`,
    transition: `all ${time}s ease-out`,
  };
  if (拓展鼠标模式.value && element.value) {
    return { ...same, opacity: 1 };
  }
  return { ...same, opacity: 0 };
});

const 点样式 = computed(() => {
  if (拓展鼠标模式.value) {
    const 最终坐标X = 计算最终坐标(
      鼠标坐标X.value,
      目标偏移X.value,
      0,
      window.innerWidth - 20,
    );
    const 最终坐标Y = 计算最终坐标(
      鼠标坐标Y.value,
      目标偏移Y.value,
      0,
      window.innerHeight - 10,
    );
    return {
      opacity: 1,
      transform: `translate(calc(${最终坐标X}px), calc(${最终坐标Y}px))`,
    };
  }
  return {
    opacity: 0,
  };
});
const 模拟点击事件 = ref(false);
const extendCursorClick = useThrottleFn((e: KeyboardEvent) => {
  e.preventDefault();
  if (拓展鼠标模式.value && e.key == 'Alt') element.value?.click?.();
}, 500);

const handleRightDown = (downEvent: MouseEvent) => {
  if (downEvent.button == 2) {
    const startX = 鼠标坐标X.value;
    const startY = 鼠标坐标Y.value;
    x.value = 鼠标坐标X.value;
    y.value = 鼠标坐标Y.value;
    let moveX = 0;
    let moveY = 0;

    const handleMouseMove = () => {
      if (!拓展鼠标模式.value) {
        setTimeout(() => {
          if (!拓展鼠标模式.value) {
            moveX = 鼠标坐标X.value - startX;
            moveY = 鼠标坐标Y.value - startY;
          }
        }, 100);
      }

      const absMoveX = Math.abs(moveX);
      const absMoveY = Math.abs(moveY);
      拓展鼠标模式.value =
        absMoveX > X偏移阈值.value || absMoveY > Y偏移阈值.value;

      if (拓展鼠标模式.value) {
        目标偏移X.value = 计算目标偏移(
          moveX,
          X偏移阈值.value,
          X拓展距离.value,
          -X拓展距离.value,
        );
        目标偏移Y.value = 计算目标偏移(
          moveY,
          Y偏移阈值.value,
          Y拓展距离.value,
          -Y拓展距离.value,
        );
        const rect = 拓展光标.value?.getBoundingClientRect();
        x.value = rect?.x || 鼠标坐标X.value;
        y.value = rect?.y || 鼠标坐标Y.value;
        if (!模拟点击事件.value) {
          document.addEventListener('keydown', (e: KeyboardEvent) => {
            extendCursorClick(e);
          });
          模拟点击事件.value = true;
        }
      }
    };
    const handleMouseUp = (e) => {
      e.preventDefault();
      if (拓展鼠标模式.value) {
        element.value?.click?.();
      }
      拓展鼠标模式.value = false;
      模拟点击事件.value = false;

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', (e: KeyboardEvent) => {
        extendCursorClick(e);
        模拟点击事件.value = true;
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
};

onMounted(() => {
  useEventListener(document, 'mousedown', handleRightDown, true);
});

defineOptions({
  name: 'ExtendCursor',
});
</script>
<template>
  <div
    tabindex="-1"
    :style="[
      {
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: 99999,
        backgroundColor: '#3eaf7c44',
      },
      选中样式,
    ]"
  />
  <div
    ref="拓展光标"
    tabindex="-1"
    :style="[
      点样式,
      {
        position: 'fixed',
        pointerEvents: 'none',
        borderRadius: '50%',
        width: '10px',
        height: '10px',
        left: 0,
        top: 0,
        background: 'red',
        zIndex: 99999,
      },
    ]"
  ></div>
</template>
