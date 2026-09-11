document.addEventListener("DOMContentLoaded", () => {

const note=document.getElementById("note");
const save=document.getElementById("save");
const clear=document.getElementById("clear");
const pdf=document.getElementById("pdf");
const notesDiv=document.getElementById("notes");

load();

save.onclick=async()=>{

const text=note.value.trim();
if(!text)return;

const time=await getTime();
const ai=generateNotes(text);

chrome.storage.local.get(["notes"],r=>{

const notes=r.notes||[];
notes.push({time,topic:text,ai});

chrome.storage.local.set({notes},()=>{note.value="";load();});

});
};

clear.onclick=()=>chrome.storage.local.set({notes:[]},load);

pdf.onclick=exportPDF;

function load(){
chrome.storage.local.get(["notes"],r=>{
notesDiv.innerHTML="";
(r.notes||[]).forEach((n,i)=>{
const box=document.createElement("div");
box.className="note-box";
box.dataset.index=i;

const t=document.createElement("span");
t.innerText=n.time;
t.className="timestamp";
t.onclick=()=>{highlight(i);seek(n.time);};

const txt=document.createElement("div");
txt.innerText=` - ${n.topic}\n${n.ai}`;

box.appendChild(t);
box.appendChild(txt);
notesDiv.appendChild(box);
});
});
}

function exportPDF(){
chrome.storage.local.get(["notes"],r=>{
const notes=r.notes||[];
if(!notes.length)return alert("No notes");

const {jsPDF}=window.jspdf;
const doc=new jsPDF();
let y=10;

notes.forEach(n=>{
const block=`${n.time} - ${n.topic}\n${n.ai}\n\n`;
const lines=doc.splitTextToSize(block,180);
doc.text(lines,10,y);
y+=lines.length*7;
if(y>270){doc.addPage();y=10;}
});

doc.save("NoteKaro_Notes.pdf");
});
}

});

// timestamp
function getTime(){
return new Promise(res=>{
chrome.tabs.query({active:true,currentWindow:true},t=>{
chrome.scripting.executeScript({
target:{tabId:t[0].id},
func:()=>{
const v=document.querySelector("video");
if(!v)return"0:00";
const m=Math.floor(v.currentTime/60);
const s=Math.floor(v.currentTime%60);
return`${m}:${s.toString().padStart(2,"0")}`;
}
},r=>res(r[0].result));
});
});
}

// seek
function seek(time){
const p=time.split(":");
const sec=parseInt(p[0])*60+parseInt(p[1]);
chrome.tabs.query({active:true,currentWindow:true},t=>{
chrome.scripting.executeScript({
target:{tabId:t[0].id},
func:s=>{
const v=document.querySelector("video");
if(v)v.currentTime=s;
},
args:[sec]
});
});
}

// highlight
function highlight(i){
document.querySelectorAll(".note-box").forEach(b=>b.classList.remove("active"));
const el=document.querySelector(`.note-box[data-index="${i}"]`);
if(el)el.classList.add("active");
}

// offline notes
function generateNotes(topic){

topic = topic.toLowerCase();

// LOSS FUNCTIONS
if(topic.includes("loss")){
return `
📌 LOSS FUNCTIONS (Machine Learning)

Loss function measures the difference between actual output (y) and predicted output (ŷ).

1️⃣ Mean Squared Error (MSE)
Formula: L = (1/n) Σ (y − ŷ)²
• Squares the error
• Penalizes large mistakes
• Used in regression

2️⃣ Mean Absolute Error (MAE)
Formula: L = (1/n) Σ |y − ŷ|
• Absolute difference
• Robust to outliers

3️⃣ Cross Entropy Loss
Formula: L = − Σ y log(ŷ)
• Used for classification
• Works with Softmax/Sigmoid

4️⃣ Hinge Loss
Formula: max(0, 1 − y·ŷ)
• Used in Support Vector Machines

👉 Purpose: Optimize model using Gradient Descent.
`;
}

// CNN
if(topic.includes("cnn")){
return `
📌 CONVOLUTIONAL NEURAL NETWORK (CNN)

CNN is mainly used for image processing.

1️⃣ Convolution Layer
• Extracts features (edges, textures)
• Uses filters/kernels

2️⃣ ReLU Activation
f(x)=max(0,x)
• Adds non-linearity

3️⃣ Pooling Layer
• Reduces feature size
• Max Pooling commonly used

4️⃣ Fully Connected Layer
• Performs classification

Applications:
• Face recognition
• Medical imaging
• Object detection
`;
}

// MACHINE LEARNING
if(topic.includes("ml")){
return `
📌 TYPES OF MACHINE LEARNING

1️⃣ Supervised Learning
• Uses labeled data
• Example: Linear Regression, SVM

2️⃣ Unsupervised Learning
• No labels
• Example: K-Means, PCA

3️⃣ Reinforcement Learning
• Reward-based learning
• Example: Robotics, Games

Goal: Automatically learn patterns from data.
`;
}

// BACKPROPAGATION
if(topic.includes("backprop")){
return `
📌 BACKPROPAGATION

Used to update neural network weights.

Steps:
1. Forward pass
2. Compute loss
3. Calculate gradients
4. Update weights

Formula:
w = w − η ∂L/∂w

η = Learning Rate

Purpose: Minimize training loss.
`;
}

return `
No predefined notes found.

Future Scope:
• Cloud AI integration
• More topics
• Automatic summarization
`;
}
