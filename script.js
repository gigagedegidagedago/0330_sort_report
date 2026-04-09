// 初始資料
let data = [50, 20, 80, 40, 10, 90, 30, 60, 70];

// 繪製長條圖的函式
function renderBars(containerId, array) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // 先清空舊的
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value}%`;
        bar.style.width = '30px';
        bar.style.margin = '0 2px';
        bar.style.backgroundColor = '#58a6ff'; // 藍色長條
        container.appendChild(bar);
    });
}

// 讓程式「暫停」的工具 (用來製造動畫效果)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 氣泡排序主程式
async function startBubbleSort() {
    let arr = [...data]; // 複製一份資料
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // 比較與排序邏輯
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                
                // 每交換一次就更新畫面並暫停 200 毫秒
                renderBars('bubble-visual', arr);
                await sleep(200); 
            }
        }
    }
}

// 網頁載入時先畫出初始狀態
renderBars('bubble-visual', data);

async function startSelectionSort() {
    let arr = [...data]; // 複製一份資料
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i; // 假設第一個是最小的

        for (let j = i + 1; j < n; j++) {
            // 這裡可以想像：我們在掃描右邊所有數字，尋找最小值的過程
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        // 找到這輪最小的了，跟第 i 個位置交換
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            
            // 更新畫面並暫停一下
            renderBars('selection-visual', arr);
            await sleep(300); 
        }
    }
}

// 網頁初始載入時，也要畫出選擇排序的初始長條
renderBars('selection-visual', data);

async function startInsertionSort() {
    let arr = [...data];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i]; // 準備要被插入的元素
        let j = i - 1;

        // 將比 key 大的元素都往右移一位
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            
            // 這裡更新畫面，可以看到長條圖在平移
            renderBars('insertion-visual', arr);
            await sleep(150);
        }
        arr[j + 1] = key; // 插入到正確位置
        
        renderBars('insertion-visual', arr);
        await sleep(300);
    }
}

// 初始載入
renderBars('insertion-visual', data);

async function startMergeSort() {
    let arr = [...data];
    await mergeSort(arr, 0, arr.length - 1);
}

async function mergeSort(arr, start, end) {
    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);
    
    // 遞迴切割
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    
    // 合併
    await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
        // 更新畫面
        renderBars('merge-visual', arr);
        await sleep(200);
    }
    
    while (i < left.length) {
        arr[k] = left[i];
        i++; k++;
        renderBars('merge-visual', arr);
        await sleep(200);
    }
    
    while (j < right.length) {
        arr[k] = right[j];
        j++; k++;
        renderBars('merge-visual', arr);
        await sleep(200);
    }
}

// 初始載入（記得加這行在 script.js 的最後面）
renderBars('merge-visual', data);

async function startQuickSort() {
    let arr = [...data];
    await quickSort(arr, 0, arr.length - 1);
}

async function quickSort(arr, low, high) {
    if (low < high) {
        // 分割陣列並取得基準點位置
        let pivotIndex = await partition(arr, low, high);
        
        // 遞迴排序左右兩邊
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high]; // 選最後一個當基準點
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            
            // 更新畫面
            renderBars('quick-visual', arr);
            await sleep(200);
        }
    }
    // 把基準點換到中間正確位置
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    renderBars('quick-visual', arr);
    await sleep(200);
    
    return i + 1;
}

// 初始載入
renderBars('quick-visual', data);
