<template>
  <van-popup v-model:show="showStatus" position="bottom" class="custom-popup">
    <div class="header">
      <div class="cancel" @click="closePopup">取消</div>
      <div class="title">绘制签名</div>
    </div>

    <div class="content">
      <div class="signature-inner" ref="wrap">
        <p class="attention">请在虚线框内绘制签名</p>
        <canvas
            ref="canvas"
            :height="state.canvasHeight"
            :width="state.canvasWidth"
            v-if="isCanvasSupported"
        ></canvas>
        <p class="signature-unsopport" v-else>{{ unSupportTpl }}</p>

        <div class="clear" @click="clear">
          <img src="../../assets/clear.png" alt="">
          <span>清除</span>
        </div>

        <div class="sure" @click="confirm">采用</div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  // 线宽
  lineWidth: {
    type: Number,
    default: 2
  },
  strokeStyle: {
    type: String,
    default: '#000'
  },
  type: {
    type: String,
    default: 'png'
  },
  unSupportTpl: {
    type: String,
    default: '当前浏览器不支持Canvas'
  },
  show: {
    type: Boolean,
    default: false
  }
})

const canvas = ref(null)
const wrap = ref(null)

const state = reactive({
  canvasHeight: 0,
  canvasWidth: 0,
  ctx: null,
  isSupportTouch: 'ontouchstart' in window,
  events:
      'ontouchstart' in window
          ? ['touchstart', 'touchmove', 'touchend', 'touchleave']
          : ['mousedown', 'mousemove', 'mouseup', 'mouseleave']
})

const isCanvasSupported = () => {
  let elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

const addEvent = () => {
  canvas.value.addEventListener(state.events[0], startEventHandler, false);
}

const startEventHandler = event => {
  event.preventDefault()
  state.ctx.beginPath()
  state.ctx.lineWidth = props.lineWidth
  state.ctx.strokeStyle = props.strokeStyle
  canvas.value.addEventListener(state.events[1], moveEventHandler, false)
  canvas.value.addEventListener(state.events[2], endEventHandler, false)
  canvas.value.addEventListener(state.events[3], leaveEventHandler, false)
}

const moveEventHandler = (event) => {
  event.preventDefault()
  let evt = state.isSupportTouch ? event.touches[0] : event
  let coverPos = canvas.value.getBoundingClientRect()
  let mouseX = evt.clientX - coverPos.left
  let mouseY = evt.clientY - coverPos.top
  state.ctx.lineTo(mouseX, mouseY)
  state.ctx.stroke()
}

const endEventHandler = (event) => {
  event.preventDefault()
  canvas.value.removeEventListener(
      state.events[1],
      moveEventHandler,
      false
  )
  canvas.value.removeEventListener(state.events[2], endEventHandler, false)
}

const leaveEventHandler = (event) => {
  event.preventDefault()
  canvas.value.removeEventListener(
      state.events[1],
      moveEventHandler,
      false
  )
  canvas.value.removeEventListener(state.events[2], endEventHandler, false)
}

const emit = defineEmits(['confirm', 'clear'])

const clear = () => {
  canvas.value.addEventListener(state.events[2], endEventHandler, false)
  state.ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight)
  state.ctx.closePath()
  emit('clear')
}

const confirm = () => {
  onSave(canvas.value)
}

const onSave = canvas => {
  let dataurl = ''
  switch (props.type) {
    case 'png':
      dataurl = canvas.toDataURL('image/png')
      break;
    case 'jpg':
      dataurl = canvas.toDataURL('image/jpeg', 0.8)
      break;
  }
  clear(true)

  emit('confirm', dataurl)
}

const canvasWrap = () => {
  if (isCanvasSupported()) {
    setTimeout(() => {
      state.ctx = canvas.value.getContext('2d')
      state.canvasWidth = wrap.value.offsetWidth - 4
      state.canvasHeight = wrap.value.offsetHeight - 4

      addEvent()
    }, 0)
  }
}

const showStatus = ref(false)

watch(() => props.show,  () => {
  showStatus.value = props.show

  if (showStatus.value) {
    canvasWrap()
  }
}, {
  immediate: true
})

const closePopup = () => {
  showStatus.value = false
}
</script>

<style lang="scss">
.custom-popup {
  height: 422px;

  .header {
    position: relative;
    height: 57px;
    line-height: 57px;

    .cancel {
      position: absolute;
      left: 35px;
      font-size: 16px;
      color: #333;
    }
    .title {
      position: absolute;
      font-size: 18px;
      font-weight: 700;
      color: #333;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .content {
    padding: 0 10px;

    .signature-inner {
      position: relative;
      height: 190px;
      border: 1px dashed #979797;

      .attention {
        position: absolute;
        bottom: 13px;
        left: 0;
        right: 0;
        z-index: -1;
        text-align: center;
        font-size: 13px;
        color: #a0a0a0;
      }
      .clear {
        font-size: 16px;
        color: #666;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;

        img {
          margin-right: 6px;
        }
      }

      .sure {
        width: 180px;
        height: 46px;
        margin: 19px auto 0;
        line-height: 46px;
        background: #df2000;
        border-radius: 4px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: #fff;
      }
    }
  }
}
</style>
