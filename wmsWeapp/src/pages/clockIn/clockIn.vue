<template>
    <div class="clock-in-page">
        <nut-notify v-if="showNotify" type="success" :msg="notifyMsg" />
        <transition name="fade-scale">
            <div v-if="!clockedIn" class="clock-in-btn-wrapper">
                <nut-button
                    type="primary"
                    size="large"
                    shape="round"
                    class="clock-in-btn"
                    @click="handleClockIn"
                >
                    <!-- <nut-icon name="clock" size="24" /> -->
                    打卡
                </nut-button>
                <div class="clock-in-time">{{ currentTime }}</div>
            </div>
            <div v-else class="clock-in-success">
                <!-- <nut-icon name="success" size="48" color="#07c160" /> -->
                <div class="success-text">打卡成功</div>
                <div class="clock-in-time">{{ currentTime }}</div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const clockedIn = ref(false)
const showNotify = ref(false)
const notifyMsg = ref('')
const currentTime = ref('')

function updateTime() {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString()
}

onMounted(() => {
    updateTime()
    setInterval(updateTime, 1000)
})

function handleClockIn() {
    clockedIn.value = true
    notifyMsg.value = '打卡成功'
    showNotify.value = true
    setTimeout(() => {
        showNotify.value = false
    }, 1500)
}
</script>

<style scoped>
.clock-in-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px;
    min-height: 100vh;
    background: #f7f8fa;
}
.clock-in-btn-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.clock-in-btn {
    width: 180px;
    height: 180px;
    font-size: 24px;
    border-radius: 50%;
    box-shadow: 0 8px 24px rgba(7,193,96,0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.clock-in-time {
    margin-top: 24px;
    font-size: 18px;
    color: #333;
}
.clock-in-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: popIn 0.6s;
}
.success-text {
    margin-top: 16px;
    font-size: 22px;
    color: #07c160;
    font-weight: bold;
}
.fade-scale-enter-active, .fade-scale-leave-active {
    transition: all 0.5s cubic-bezier(.55,0,.1,1);
}
.fade-scale-enter-from, .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
@keyframes popIn {
    0% { transform: scale(0.7); opacity: 0; }
    80% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}
</style>
