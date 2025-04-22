# loopa_app.py

import streamlit as st
import re
import random

st.set_page_config(page_title="Loopa – Untangle Your Thoughts", layout="centered")

st.title("🌀 Loopa")
st.subheader("Untangle negative thought spirals in real-time.")

st.markdown("Tell me what's on your mind:")

user_input = st.text_area("Your thought", height=150, placeholder="e.g., I failed one test. I’m never going to succeed.")

distortions = {
    "catastrophizing": ["never", "always", "everything is ruined", "it's hopeless"],
    "mind reading": ["they must think", "everyone knows", "i bet they believe"],
    "black and white thinking": ["completely", "total failure", "perfect or nothing"],
    "should statements": ["i should", "i must", "i ought to"],
}

reframes = {
    "catastrophizing": "You're imagining the worst outcome. Try asking: *What’s the most realistic outcome instead?*",
    "mind reading": "You're assuming what others think. Ask: *Do I have real evidence for that?*",
    "black and white thinking": "Things aren't all-or-nothing. Ask: *What’s one part that went okay?*",
    "should statements": "‘Shoulds’ can be harsh. Ask: *What would I tell a friend in this situation?*",
}

def detect_distortion(text):
    for distortion, patterns in distortions.items():
        for pattern in patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return distortion
    return None

if st.button("🧠 Analyze"):
    if user_input.strip() == "":
        st.warning("Please type a thought first.")
    else:
        distortion = detect_distortion(user_input)
        if distortion:
            st.success(f"**Detected distortion:** {distortion.replace('_', ' ').title()}")
            st.markdown(f"> {reframes[distortion]}")
        else:
            st.info("Hmm, I couldn’t detect a specific thinking pattern, but take a breath and try reframing: *What part of this thought feels most true? Most helpful?*")

        st.markdown("---")
        st.markdown("💫 *Visualizing your thought untangling...*")
        st.image("https://media.giphy.com/media/3ohzdYJK1wAdPWVk88/giphy.gif", use_container_width=True)
