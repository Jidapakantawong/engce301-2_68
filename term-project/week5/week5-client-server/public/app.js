// เพิ่มที่ด้านบน
const API_BASE = API_CONFIG.BASE_URL;
const API = {
    TASKS: `${API_BASE}${API_CONFIG.ENDPOINTS.TASKS}`,
    STATS: `${API_BASE}${API_CONFIG.ENDPOINTS.STATS}`
};

// อัพเดท fetch calls ทั้งหมด
// เปลี่ยนจาก: fetch('/api/tasks')
// เป็น: fetch(API.TASKS)

// ตัวอย่าง:
async function loadTasks() {
    try {
        const res = await fetch(API.TASKS);
        if (!res.ok) throw new Error('โหลด tasks ล้มเหลว');
        const { data } = await res.json();
        renderTasks(data);
    } catch (error) {
        console.error('Error loading tasks:', error);
        showError('โหลด tasks จาก server ล้มเหลว');
    }
}

// อัพเดท fetch calls อื่นๆ ด้วยวิธีเดียวกัน...