"""Update Francois Porto.pptx to match latest CV wording."""

from pathlib import Path
import shutil

from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE

SRC = Path(r"c:\Users\noval\Documents\BERKAS PENTING NOVAL\Francois Porto.backup.pptx")
OUT = Path(r"c:\Users\noval\Documents\BERKAS PENTING NOVAL\Francois Porto Updated.pptx")
BACKUP = Path(r"c:\Users\noval\Documents\BERKAS PENTING NOVAL\Francois Porto.backup.pptx")
PROJECT_COPY = Path(r"c:\Users\noval\Projects\Sinity Projects\francois-porto\Francois Porto Updated.pptx")


def set_paragraph_text(paragraph, text: str) -> None:
    if paragraph.runs:
        paragraph.runs[0].text = text
        for run in paragraph.runs[1:]:
            run.text = ""
    else:
        paragraph.text = text


def set_textbox_lines(shape, lines: list[str]) -> None:
    tf = shape.text_frame
    paras = list(tf.paragraphs)
    while len(paras) < len(lines):
        p = tf.add_paragraph()
        if paras and paras[0].runs:
            src = paras[0].runs[0]
            r = p.add_run()
            r.font.size = src.font.size
            r.font.bold = src.font.bold
            r.font.name = src.font.name
        paras = list(tf.paragraphs)

    for i, para in enumerate(paras):
        set_paragraph_text(para, lines[i] if i < len(lines) else "")


def walk_shapes(slide):
    def _walk(shape):
        if shape.shape_type == MSO_SHAPE_TYPE.GROUP:
            for s in shape.shapes:
                yield from _walk(s)
            return
        yield shape

    for shape in slide.shapes:
        yield from _walk(shape)


def full_text(shape) -> str:
    return "\n".join(p.text for p in shape.text_frame.paragraphs)


def dump(prs, idx: int) -> None:
    print(f"\n=== SLIDE {idx + 1} ===")
    for shape in walk_shapes(prs.slides[idx]):
        if not shape.has_text_frame:
            continue
        for p in shape.text_frame.paragraphs:
            t = p.text.strip()
            if t:
                print(t[:180])


def main() -> None:
    # Restore from Poppins-preserving backup, then re-apply CV text.
    shutil.copy2(SRC, OUT)
    prs = Presentation(str(OUT))

    # Slide 1 — title
    for shape in walk_shapes(prs.slides[0]):
        if not shape.has_text_frame:
            continue
        t = shape.text_frame.paragraphs[0].text.strip()
        if t == "FULL STACK DEVELOPER":
            set_textbox_lines(shape, ["BACKEND DEVELOPER"])

    # Slide 2 — about
    about = (
        "Hello, I'm Noval. Informatics Engineering graduate from Institut Teknologi Sumatera "
        "with 2+ years of hands-on experience in backend and full stack web development. "
        "Skilled in building scalable web applications, RESTful APIs, system integrations, "
        "and cloud-based deployments using Golang, Node.js, PHP, Python, Next.js, and React.js. "
        "Experienced in developing financial and enterprise systems with PostgreSQL, MySQL, "
        "Redis, RabbitMQ, and Google Cloud Platform (GCP). Strong adaptability, problem-solving "
        "skills, and proven experience working in both collaborative teams and production environments."
    )
    for shape in walk_shapes(prs.slides[1]):
        if not shape.has_text_frame:
            continue
        if "Informatics Engineering graduate" not in full_text(shape):
            continue
        paras = list(shape.text_frame.paragraphs)
        if len(paras) >= 2 and not paras[0].text.strip():
            set_paragraph_text(paras[1], about)
            for p in paras[2:]:
                set_paragraph_text(p, "")
        else:
            set_textbox_lines(shape, [about])

    # Slide 3 — education + org
    org_bullets = [
        "Head of Operations Division for the Informatics Student Association Members' Assembly (2023)",
        "Event Coordinator for the Christmas Celebration (2023)",
        "Operational Staff for the Inauguration Event (2023)",
        "Operational Staff for the Leadership, Ethics, and Organizational Management Training (LKEMO) (2023)",
        "Operational Staff for the First Gathering (2022)",
    ]
    for shape in walk_shapes(prs.slides[2]):
        if not shape.has_text_frame:
            continue
        full = full_text(shape)
        if "Final year" in full or "GPA:  3.32" in full:
            set_textbox_lines(
                shape,
                [
                    "Bachelor of Informatics Engineering",
                    "GPA: 3.33 / 4.00",
                    "Thesis: Development of a Recommendation System for Massive Open Online Courses Using Hybrid Filtering",
                    "Built a MOOC recommendation web app using hybrid ML models with Next.js, FastAPI, and GCP",
                ],
            )
        elif "Institut Teknologi Sumatera" in full and "2021" in full:
            set_textbox_lines(shape, ["Institut Teknologi Sumatera", "(2021 - 2025)"])
        elif "Himpunan Mahasiswa Informatika" in full:
            set_textbox_lines(shape, ["Himpunan Mahasiswa Informatika ITERA", "(2023 - 2024)"])
        elif "Head of Operations" in full:
            set_textbox_lines(shape, org_bullets)
        elif "IPA" in full and "87.5" in full:
            set_textbox_lines(shape, ["IPA", "GPA: 87.50/100"])

    # Slide 4 — skills wording
    for shape in walk_shapes(prs.slides[3]):
        if not shape.has_text_frame:
            continue
        t = shape.text_frame.paragraphs[0].text.strip()
        if t == "Nodejs":
            set_textbox_lines(shape, ["Node.js"])

    # Slide 5 — Neekosa + TOP
    for shape in walk_shapes(prs.slides[4]):
        if not shape.has_text_frame:
            continue
        full = full_text(shape).strip()

        if "FULL STACK DEVELOPER INTERN" in full:
            set_textbox_lines(shape, ["BACKEND DEVELOPER"])
        elif "Dinas Cipta Karya" in full:
            set_textbox_lines(shape, ["PT Teknologi Operator Prima"])
        elif "June - August" in full and "2024" in full:
            set_textbox_lines(shape, ["August 2025 -", "July 2026"])
        elif "Asset Groups using Laravel" in full or "AssetGroup Model" in full:
            set_textbox_lines(
                shape,
                [
                    "Developed Mobile Banking backend services using Golang, handling core business logic and high-performance APIs.",
                    "Optimized MySQL queries and improved performance through indexing and query tuning.",
                    "Integrated external systems via SFTP and managed transactional data using PostgreSQL.",
                    "Developed Gateway Service using Golang for payment gateway, third-party APIs, and internal microservices.",
                    "Implemented Redis for caching and RabbitMQ for asynchronous messaging.",
                    "Maintained Digital Banking applications using Delphi and developed ERP modules using PHP with MongoDB.",
                    "Performed API testing and UAT using Postman.",
                ],
            )
        elif "PT Teknologi Operator Prima" in full:
            set_textbox_lines(shape, ["PT Neekosa Pakar Services (Client: PT Pegadaian)"])
        elif "August 2025 - Present" in full:
            set_textbox_lines(shape, ["July 2026 -", "Present"])
        elif "Loan Channeling Service" in full or "Digital Core Banking" in full:
            set_textbox_lines(
                shape,
                [
                    "Develop and maintain Golang microservices for Pegadaian Gadai Syariah Rahn with TEFS Titipan from loan submission through disbursal.",
                    "Build end-to-end Rahn and TEFS Titipan conversion across submission, approval, confirmation, and disbursement services.",
                    "Maintain multi-stage workflow orchestration and service integrations using OpenAPI and Swagger.",
                    "Create Kafka Control Center connectors to consume and sync data from DB2 to PostgreSQL via API.",
                    "Support production delivery on Pegadaian SPRINT including API testing and UAT with Postman.",
                ],
            )

    # Slide 6 — Dinas + Bangkit
    for shape in walk_shapes(prs.slides[5]):
        if not shape.has_text_frame:
            continue
        full = full_text(shape).strip()

        if "LAB ASISSTANT" in full or "LAB ASSISTANT" in full:
            set_textbox_lines(shape, ["FULL STACK DEVELOPER INTERN"])
        elif full == "Institut Teknologi Sumatera":
            set_textbox_lines(
                shape,
                ["Dinas Cipta Karya Tata Ruang dan Pertanahan Provinsi DKI Jakarta"],
            )
        elif "Februari 2023" in full or ("Februari" in full and "2024" in full):
            set_textbox_lines(shape, ["June - August", "2024"])
        elif "Microsoft Word and Excel" in full or "computer architecture" in full or "focus on C++" in full:
            set_textbox_lines(
                shape,
                [
                    "Implemented essential features like Asset Groups using Laravel Framework for efficient asset categorization and management.",
                    "Developed and integrated the AssetGroup Model with Laravel Eloquent ORM for effective data storage and management.",
                    "Adopted the MVC architecture in Laravel to enhance system modularity, maintainability, and performance.",
                ],
            )
        elif "CLOUD COMPUTING ALUMNI" in full:
            set_textbox_lines(shape, ["CLOUD COMPUTING"])
        elif "Bangkit Academy" in full:
            set_textbox_lines(
                shape,
                ["Bangkit Academy by Google, Tokopedia, Gojek, and Traveloka"],
            )
        elif "Utilize Google Cloud Platform" in full:
            set_textbox_lines(
                shape,
                [
                    "Utilized Google Cloud Platform for cloud-based project development.",
                    "Collaborated on a capstone project using Next.js, Node.js, and Cloud SQL.",
                    "Deployed the application on Google Cloud Run for scalable delivery.",
                ],
            )

    # Projects — Sinity Course
    for shape in walk_shapes(prs.slides[7]):
        if not shape.has_text_frame:
            continue
        full = full_text(shape)
        if "Final Project" in full or "mooc recommendation" in full.lower():
            set_textbox_lines(
                shape,
                [
                    "Final thesis project at Institut Teknologi Sumatera. Built a MOOC recommendation web app using hybrid machine learning models that combine content-based and collaborative filtering.",
                ],
            )
        elif "NextJS App Router" in full or "Python FastAPI" in full:
            set_textbox_lines(
                shape,
                [
                    "Developed a responsive frontend using Next.js, Tailwind CSS, and ShadCN UI.",
                    "Implemented recommendation API and hybrid ML models using FastAPI.",
                    "Integrated PostgreSQL as the primary relational database.",
                    "Deployed on Google Cloud Platform using Cloud Run.",
                ],
            )

    # Projects — Rekomenin
    for shape in walk_shapes(prs.slides[8]):
        if not shape.has_text_frame:
            continue
        full = full_text(shape)
        if "capstone Project on Bangkit" in full:
            set_textbox_lines(
                shape,
                [
                    "Capstone project for Bangkit Academy 2024 led by Google, GoTo, Traveloka, and Tokopedia. Recommendation platform for courses and jobs on Dicoding.",
                ],
            )
        elif "Implemented  scalable backend system using Python" in full:
            set_textbox_lines(
                shape,
                [
                    "Developed a responsive frontend web interface using Next.js.",
                    "Integrated frontend services with backend APIs.",
                    "Managed cloud deployment on Google Cloud Platform.",
                    "Deployed using Google Cloud Run.",
                ],
            )

    # Projects — Asset Management title fix
    for shape in walk_shapes(prs.slides[9]):
        if not shape.has_text_frame:
            continue
        full = full_text(shape)
        if "Asset Manajemen" in full:
            set_textbox_lines(shape, ["Asset Management System"])
        elif "Full Stack Developer Intern at Dinas" in full:
            set_textbox_lines(
                shape,
                [
                    "Developed a web-based asset management system as a Full Stack Developer Intern at Dinas Cipta Karya Tata Ruang dan Pertanahan Provinsi DKI Jakarta.",
                ],
            )

    # Certificates wording
    for shape in walk_shapes(prs.slides[12]):
        if not shape.has_text_frame:
            continue
        t = shape.text_frame.paragraphs[0].text.strip()
        if t == "JavaScript Programming Basic":
            set_textbox_lines(shape, ["JavaScript Programming Basics"])

    prs.save(str(OUT))
    print("Saved:", OUT)
    print("Source backup:", SRC)

    for i in [0, 1, 2, 4, 5, 7]:
        dump(prs, i)


if __name__ == "__main__":
    main()
