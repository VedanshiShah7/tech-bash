import streamlit as st
import random
from datetime import datetime
import os

# --- Theme Toggle ---
theme = st.selectbox("🌓 Choose Your Theme", ["Light", "Dark"], index=0)

# --- Define Colors ---
if theme == "Light":
    bg_color = "#f9f6f7"
    text_color = "#111"
    input_bg = "#ffffff"
else:
    bg_color = "#1c1c1c"
    text_color = "#eeeeee"
    input_bg = "#2e2e2e"

# --- Apply Style ---
st.markdown(f"""
    <style>
    .main {{
        background-color: {bg_color};
        color: {text_color};
    }}
    body, .stTextInput, .stTextArea textarea {{
        color: {text_color} !important;
        background-color: {input_bg} !important;
        border-radius: 10px !important;
        padding: 10px !important;
        font-size: 16px !important;
        font-family: 'Georgia', serif !important;
    }}
    .stButton>button {{
        color: {text_color} !important;
        background-color: #8ac9d1 !important;
        border-radius: 10px !important;
    }}
    .stButton>button:hover {{
        background-color: #6fa8c5 !important;
    }}
    .stExpander {{
        background-color: #f0f0f0 !important;
        border-radius: 8px !important;
        padding: 10px !important;
    }}
    </style>
""", unsafe_allow_html=True)

# --- App Title and Intro ---
st.title("🕊️ Solace")
st.subheader("A gentle space for healing.")

# --- Ambient sound toggle ---
sound = st.radio("🎶 Choose Ambient Sound:", ["None", "Rain", "Ocean", "Forest"], horizontal=True)
if sound == "Rain":
    st.audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", format="audio/mp3", start_time=0)
elif sound == "Ocean":
    st.audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", format="audio/mp3", start_time=0)
elif sound == "Forest":
    st.audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", format="audio/mp3", start_time=0)

# --- Reflective Prompt ---
prompts = [
    "What’s one thing you miss most right now?",
    "Describe a moment of connection you shared with them.",
    "If you could say something to them today, what would it be?",
    "What memory brings you peace today?",
    "What does healing look like for you right now?",
]
prompt = random.choice(prompts)
st.markdown("### 🌿 Today's Reflection")
st.info(prompt)

# --- Journaling space ---
default_text = f"Entry on {datetime.now().strftime('%B %d, %Y')}\n\n"
entry = st.text_area("📝 Write from the heart:", height=300, value=default_text)

# --- Save Entry ---
if st.button("💾 Save Entry"):
    filename = f"solace_entry_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    with open(filename, "w") as file:
        file.write(entry)
    st.success(f"Your entry has been saved as `{filename}`")

# --- View Saved Entries ---
st.markdown("### 📖 View Saved Entries")
saved_files = [f for f in os.listdir() if f.startswith("solace_entry_") and f.endswith(".txt")]

if saved_files:
    for file in saved_files:
        with open(file, "r") as f:
            entry_content = f.read()
            with st.expander(f"Entry - {file}"):
                st.text(entry_content)
else:
    st.write("No saved entries yet.")

# --- Footer ---
st.markdown("""
    <style>
    .footer {
        font-size: 12px;
        text-align: center;
        color: #888;
        padding: 10px;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    </style>
    <div class="footer">
        🕊️ Solace | A gentle space for reflection and healing
    </div>
""", unsafe_allow_html=True)
