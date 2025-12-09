---
title: "Agnus The Troll"
date: 2025-04-26
summary: "An interactive audio-video agent designed to mock and provoke attendees."
portfolio_tags: ["Generative AI", "Audio", "Video"]
highlights:
  - "Built a real-time audio-video loop connecting a dynamic microphone and webcam for live speech and visual input."
  - "Integrated the Gemini 2.5 Live API with WebSockets to stream and play spoken responses in continuous conversation."
  - "Configured session memory and a simple Gradio interface to let users start, stop and resume interaction seamlessly."
weight: 20
draft: false
build:
  render: always   # Build and render single page
  list: always     # Show in lists
---


<figure class="post-figure">
  <img src="resources/04-exhibition.jpeg" alt="Agnus displayed on the LED wall at the exhibition" style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>Agnus displayed at the Generative Machine Learning Exhibition.</figcaption>
</figure>

For the Generative Machine Learning course at The Cooper Union, my team created Agnus, an interactive AI agent that brings internet troll behavior into physical space. We asked: what if you could interact with a troll in person? The result was an installation that could see, hear, and verbally roast exhibition attendees in real time.

The installation featured an LED wall displaying an animated troll created by Ben Butler, paired with a webcam, dynamic microphone, and speakers. Using the Gemini 2.5 Live API, we streamed real-time video and audio through WebSockets, allowing Agnus to craft personalized insults based on what it saw and heard. A Gradio interface enabled seamless session control.

<figure class="post-figure">
  <img src="resources/02-system-interaction.png" alt="System interaction flow" style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>System architecture showing real-time audio-video streaming with sub-second latency.</figcaption>
</figure>

The exhibition revealed how quickly multimodal AI has evolved. While most attendees were familiar with chatbots and image generators, real-time audio-visual interaction caught them off guard. Visitors laughed nervously as Agnus identified embarrassing details and made sharp observations based on their appearance and voice. This project taught me about latency optimization, personality tuning through prompt engineering, and how combining visual and audio cues creates a more convincing presence than text-based systems alone.


<div class="post-resources">
  <a href="https://github.com/toribiodiego/ECE-471-Generative-Machine-Learning/tree/main/Final_Project">Code</a>
</div>
