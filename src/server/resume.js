import docx, { convertInchesToTwip } from "docx";

const {
  AlignmentType,
  Document,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} = docx;

const fontType = "Times New Roman";

// divided by 2 gives real font size
const bodyFontSize = 24;

// Redefine because of smaller margins
TabStopPosition.MAX = 12200;

export class DocumentCreator {
  create([experiences, education, skills, user]) {
    const document = new Document({
      numbering: {
        config: [
          {
            reference: "description-bullet",
            levels: [
              {
                level: 0,
                format: docx.LevelFormat.BULLET,
                text: "\u2981",
                alignment: docx.AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: {
                      left: docx.convertInchesToTwip(0.1),
                      hanging: docx.convertInchesToTwip(0.12),
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(0.4),
                bottom: convertInchesToTwip(0.62),
                left: convertInchesToTwip(0.5),
                right: convertInchesToTwip(0.5),
              },
            },
          },
          children: [
            ...this.createPersonal(user),
            this.createSectionHeading("Education"),
            ...this.createEducationArray(education),
            new Paragraph({ spacing: { line: 100 } }),
            ...this.createExperienceArray(this.splitExperiences(experiences)),
            ...this.createSkillArray(this.splitSkills(skills)),
          ],
        },
      ],
    });

    return document;
  }

  createPersonal(user) {
    return [
      this.createNameHeader(user.firstName, user.lastName),
      this.createContact(user.email, user.phoneNumber, user.website),
      new Paragraph({ children: [] }),
    ];
  }

  createEducation(education) {
    return [
      this.createEducationHeader(education.school, education.location),
      this.createEducationSubHeader(
        education.degreeType,
        education.major,
        education.gpa,
        this.formatDate(education.gradDate),
        education.minor
      ),
    ];
  }

  createNameHeader(fn, ln) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `${fn} ${ln}`,
          size: 36,
          font: {
            name: fontType,
          },
          bold: true,
        }),
      ],
    });
  }

  formatPhoneNum(phone) {
    return (
      "(" +
      phone.substring(0, 3) +
      ") " +
      phone.substring(3, 6) +
      "-" +
      phone.substring(6)
    );
  }

  createContact(email, phone, website) {
    phone = this.formatPhoneNum(phone);
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `${email} | ${phone} | ${website}`,
          size: 26,
          font: {
            name: fontType,
          },
        }),
      ],
    });
  }

  createSectionHeading(sectionName) {
    return new Paragraph({
      children: [
        new TextRun({
          text: sectionName,
          size: bodyFontSize,
          font: {
            name: fontType,
          },
          allCaps: true,
          bold: true,
        }),
      ],
      thematicBreak: true,
    });
  }

  createEducationHeader(institutionName, location) {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: `${institutionName}`,
          bold: true,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
        new TextRun({
          text: `\t${location}`, // \t to use the tab stop
          bold: true,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
      ],
      spacing: { line: 241 }, // add spacing to make sure letters don't get cut off
    });
  }

  createEducationSubHeader(
    degreeType,
    major,
    gpa,
    graduationDate,
    minor = null
  ) {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: `${degreeType} in ${major}${
            minor ? ", Minor in " + minor : ""
          } ${gpa ? "| " + gpa + "/4.00" : ""}`,
          italics: true,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
        new TextRun({
          text: `\t${graduationDate}`,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
      ],
      spacing: {
        before: 15,
      },
    });
  }

  createEducationDesc(honors) {
    return new Paragraph({
      children: [
        new TextRun({
          text: `Honors & Awards: ${honors}`,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
      ],
      spacing: { before: 15 },
    });
  }

  createWorkHeader(company, location) {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: `${company}`,
          bold: true,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
        new TextRun({
          text: `\t${location}`,
          bold: true,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
      ],
    });
  }

  createWorkSubHeader(position, startDate, endDate) {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: `${position}`,
          italics: true,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
        new TextRun({
          text: `\t${startDate} - ${endDate}`,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
      ],
    });
  }

  createBullets(bulletArray) {
    const bullets = [];
    bulletArray.forEach((val) => {
      bullets.push(
        new Paragraph({
          numbering: {
            reference: "description-bullet",
            level: 0,
          },
          children: [
            new TextRun({
              text: `${val}`,
              font: {
                name: fontType,
              },
              size: 22,
            }),
          ],
          spacing: {
            before: 15,
            line: 245,
          },
        })
      );
    });
    return bullets;
  }

  createSkills(skills, type) {
    const text = skills.join(", ");
    return new Paragraph({
      children: [
        new TextRun({
          text: `${type}: `,
          bold: true,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
        new TextRun({
          text: text,
          font: {
            name: fontType,
          },
          size: bodyFontSize,
        }),
      ],
    });
  }

  createEducationArray(educationObj) {
    let educationObjArray = Object.values(educationObj);
    let educationArray = [];
    educationObjArray.forEach((education) => {
      educationArray.push(...this.createEducation(education));
      educationArray.push(new Paragraph({ children: [] }));
    });
    return educationArray;
  }

  splitExperiences(experienceObj) {
    let experienceObjArray = Object.values(experienceObj);
    let workArray = [];
    let researchArray = [];
    let extracurricularArray = [];
    experienceObjArray.forEach((experience) => {
      if (experience.section === "Work") {
        workArray.push(experience);
      } else if (experience.section === "Research") {
        researchArray.push(experience);
      } else {
        extracurricularArray.push(experience);
      }
    });
    return {
      workArray: workArray,
      researchArray: researchArray,
      extracurricularArray: extracurricularArray,
    };
  }

  compareDates(a, b) {
    if (a.endDate < b.endDate) {
      return 1;
    }
    if (a.endDate > b.endDate) {
      return -1;
    }
    return 0;
  }

  createExperienceArray(experiences) {
    let experienceArray = [];
    if (experiences.workArray.length !== 0) {
      experienceArray.push(this.createSectionHeading("Work Experience"));

      experiences.workArray.sort(this.compareDates);

      experiences.workArray.forEach((experience) => {
        experienceArray.push(
          this.createWorkHeader(experience.organization, experience.location),
          this.createWorkSubHeader(
            experience.title,
            this.formatDate(experience.startDate),
            this.formatDate(experience.endDate)
          ),
          ...this.createBullets(experience.description.split(","))
        );
        experienceArray.push(new Paragraph({ children: [] }));
      });
    }
    if (experiences.researchArray.length !== 0) {
      experienceArray.push(this.createSectionHeading("Research Experience"));

      experiences.researchArray.sort(this.compareDates);

      experiences.researchArray.forEach((experience) => {
        experienceArray.push(
          this.createWorkHeader(experience.organization, experience.location),
          this.createWorkSubHeader(
            experience.title,
            this.formatDate(experience.startDate),
            this.formatDate(experience.endDate)
          ),
          ...this.createBullets(experience.description.split(","))
        );
        experienceArray.push(new Paragraph({ children: [] }));
      });
    }
    if (experiences.extracurricularArray.length !== 0) {
      experienceArray.push(
        this.createSectionHeading("Extracurricular Experience")
      );

      experiences.extracurricularArray.sort(this.compareDates);

      experiences.extracurricularArray.forEach((experience) => {
        experienceArray.push(
          this.createWorkHeader(experience.organization, experience.location),
          this.createWorkSubHeader(
            experience.title,
            this.formatDate(experience.startDate),
            this.formatDate(experience.endDate)
          ),
          ...this.createBullets(experience.description.split(","))
        );
        experienceArray.push(new Paragraph({ children: [] }));
      });
    }
    return experienceArray;
  }

  splitSkills(skills) {
    let skillsObjArray = Object.values(skills);
    let technicalArray = [];
    let languageArray = [];
    let interestArray = [];
    skillsObjArray.forEach((skill) => {
      if (skill.tag === "Language") {
        languageArray.push(skill.skill);
      } else if (skill.tag === "Technical Skill") {
        technicalArray.push(skill.skill);
      } else {
        interestArray.push(skill.skill);
      }
    });
    return {
      technicalArray: technicalArray,
      languageArray: languageArray,
      interestArray: interestArray,
    };
  }

  createSkillArray(skills) {
    let skillsArray = [];
    skillsArray.push(this.createSectionHeading("Skills and Interests"));
    if (skills.technicalArray.length !== 0) {
      skillsArray.push(this.createSkills(skills.technicalArray, "Technical"));
    }
    if (skills.languageArray.length !== 0) {
      skillsArray.push(this.createSkills(skills.languageArray, "Language"));
    }
    if (skills.interestArray.length !== 0) {
      skillsArray.push(this.createSkills(skills.interestArray, "Interests"));
    }

    return skillsArray.length === 1 ? [] : skillsArray;
  }

  formatDate(date) {
    const months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "November",
      12: "December",
    };

    return date === "Present"
      ? date
      : months[date.slice(5)] + " " + date.slice(0, 4);
  }
}
