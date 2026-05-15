---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
=====
* B.S. in Computer Science and Technology, Xi'an Jiaotong University, 2023 – Present

**Core Courses:** Linear Algebra (99), Advanced Mathematics (95), Data Structures (90), OOP (98), Digital Logic Circuits (90), Probability Theory (89), ICS (96), Computer Graphics (95), Computer Networks (89), Operating Systems (85)

**Ranking:** Freshman year: 17/193, Sophomore year: 22/188

**Scholarships:** Second-Class Scholarship (Freshman & Sophomore Year), Excellent Student Award

Research Experience
=====
* **AVE-Compass: Towards Holistic Evaluation for Audio-Video Editing Abilities** (NeurIPS 2026 under review)
  * **Benchmark Construction:** Built a comprehensive audio-video dataset covering 33 fine-grained categories and 190 instructions, addressing the gap in cross-modal physical alignment evaluation.
  * **Evaluation Design:** Implemented a decoupled evaluation pipeline combining "objective physical metrics + modality-separated MLLM checklist" to precisely quantify Instruction Following (IF), Fidelity Preservation (FP), and Realism (R).
  * **Experimental Analysis:** Deployed full evaluation on SOTA models including Wan2.7 and LTX2, revealing core weaknesses such as "cross-modal intention failure" in multimodal LLMs through human-machine consistency and robustness analysis.

* **RoboCup Robot Electronic Control System Development**
  * Developed the electronic control system for a multi-degree-of-freedom robotic arm, implementing low-level motor drivers and sensor closed-loop control.
  * Applied PID control algorithms for gravity compensation of the robotic arm, effectively eliminating steady-state errors and motion jitter caused by link self-weight, significantly improving end-effector positioning accuracy.

* **YOLO Deployment and Acceleration on Ascend NPU**
  * Completed lightweight deployment of YOLO models on Ascend NPU, enabling end-to-end edge inference.
  * Improved object detection FPS through model conversion and edge-side acceleration optimization, significantly reducing transmission latency.

Skills
=====
* **Programming Languages:** C/C++, Python
* **Frameworks & Tools:** PyTorch, YOLO, Git, Linux/Ubuntu
* **Languages:** English (CET-4: 619, CET-6: 590)

Honors & Awards
=====
* Meritorious Winner (M奖) — MCM/ICM Mathematical Contest in Modeling
* Third Prize — RoboCup China Competition
* Second-Class Scholarship — Xi'an Jiaotong University
* Excellent Student Award — Xi'an Jiaotong University

Publications
=====
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
=====
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
=====
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
