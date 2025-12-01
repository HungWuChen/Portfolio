
import { Project, Experience, SkillCategory } from './types';

export const HERO_DATA = {
  name: "HUNG CHIH WU CHEN",
  title: "COMPUTATIONAL MECHANICAL DESIGNER",
  tagline: "Bridging the gap between physics-based simulation and automated design implementation.",
  email: "hungwuu@gmail.com",
  phone: "+39 3450306447",
  location: "Milano, Italy",
  linkedin: "https://www.linkedin.com/in/hung-wu/" // UPDATE THIS LINK
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Analysis & Simulation",
    skills: ["ANSYS Mechanical", "Abaqus FEA", "OpenFOAM (CFD)", "Topology Optimization (Hypermesh)"]
  },
  {
    title: "Design/CAD/CAM",
    skills: ["SolidWorks", "Inventor", "Rhino 3D + Grasshopper", "Fusion 360", "Fusion 360 CAM"]
  },
  {
    title: "Computation & Code",
    skills: ["Python", "MATLAB"]
  }  
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp1",
    role: "Senior Mechanical Design Engineer",
    company: "AeroTech Solutions",
    period: "2021 - Present",
    description: "Lead structural analysis for next-gen drone chassis. Implemented Python-based automated design loops reducing iteration time by 40%."
  },
  {
    id: "exp2",
    role: "Simulation Engineer",
    company: "Dynamics Corp",
    period: "2018 - 2021",
    description: "Conducted non-linear contact analysis for automotive suspension components. Validated FEA models against physical test data."
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "Generative Bracket Optimization",
    subtitle: "Topology Optimization for Aerospace",
    category: "FEM",
    description: "Weight reduction of an engine mount bracket using topology optimization algorithms while maintaining structural integrity under high-g loads.",
    tags: ["nTopology", "ANSYS", "Additive Mfg"],
    imageUrl: import.meta.env.BASE_URL + "Fig/RhinoSurface.png",
    gallery: ["https://picsum.photos/800/604"],
    highlights: [
      { label: "Mass Reduction", value: "35%" },
      { label: "Stiffness Increase", value: "12%" },
      { label: "Safety Factor", value: "2.1" }
    ],
    details: "Utilized nTopology to generate a lattice structure core. The geometry was exported to ANSYS for validation under static and vibrational loads. Final design was printed in Ti-6Al-4V using DMLS.",
    methodology: "The workflow began with a base design space definition in CAD. Load cases were derived from flight data telemetry. Topology optimization was performed using SIMP method with a volume fraction constraint. The resulting mesh was smoothed and reconstructed into NURBS surfaces for final FEA validation."
  },
  {
    id: "p2",
    title: "Automated Heat Sink Design",
    subtitle: "Thermal CFD & Python Automation",
    category: "CFD",
    description: "Developed a Python script to parametrically generate heat sink geometries and automatically run CFD simulations to find the optimal fin density.",
    tags: ["OpenFOAM", "Python", "Thermal"],
    imageUrl: "https://picsum.photos/800/601",
    gallery: ["https://picsum.photos/800/605"],
    highlights: [
      { label: "Dissipation", value: "150W" },
      { label: "Iterations", value: "500+" },
      { label: "Time Saved", value: "200 hrs" }
    ],
    details: "Created a closed-loop optimization workflow. Python scripts drove the CAD geometry generation, meshing in SnappyHexMesh, and solving in OpenFOAM. A genetic algorithm converged on the optimal design.",
    methodology: "Implemented a conjugate heat transfer solver. The automation script handled mesh independence studies automatically. Post-processing was done using ParaView batch scripting to extract maximum junction temperatures."
  },
  {
    id: "p3",
    title: "Soft Robotics Actuator",
    subtitle: "Non-linear Hyperelastic FEA",
    category: "FEM",
    description: "Simulation of silicone elastomer pneumatic networks to predict bending angles and gripping force.",
    tags: ["Abaqus", "Hyperelasticity", "R&D"],
    imageUrl: "https://picsum.photos/800/602",
    highlights: [
      { label: "Material", value: "Silicone" },
      { label: "Response", value: "Non-linear" },
      { label: "Force Output", value: "15N" }
    ],
    details: "Characterized material properties using Yeoh hyperelastic models. Simulations predicted the ballooning effect and interaction contact pressures, validated by physical prototypes."
  },
  {
    id: "p4",
    title: "Parametric Facade System",
    subtitle: "Grasshopper & Structural Analysis",
    category: "CAD",
    description: "Design of a kinetic building facade that adjusts to solar angle. Structural integrity of moving parts verified via FEA.",
    tags: ["Rhino", "Grasshopper", "Karamba3D"],
    imageUrl: "https://picsum.photos/800/603",
    gallery: ["https://picsum.photos/800/606"],
    highlights: [
      { label: "Type", value: "Kinetic" },
      { label: "Part Count", value: "2400" },
      { label: "Standard", value: "Eurocode 3" }
    ],
    details: "A fully parametric model linked to local weather data. Karamba3D was used for initial beam element analysis before detailed connection analysis in SolidWorks Simulation.",
    methodology: "Scripts were developed to translate environmental data into kinematic motion paths. Stress hotspots were identified in real-time during the design phase using simplified beam models, allowing for rapid iteration before detailed solid modeling."
  },
  
  // --- NEW PROJECT TEMPLATE ---
  // Copy and uncomment the block below to add a new project.
  // {
  //   id: "p5",
  //   title: "PROJECT TITLE",
  //   subtitle: "SHORT SUBTITLE",
  //   category: "CATEGORY (e.g., CAD, FEM, CFD)",
  //   description: "Short description for the card view.",
  //   tags: ["Tag1", "Tag2"],
  //   imageUrl: "https://placehold.co/800x600", // Main image
  //   gallery: [
  //      "https://placehold.co/800x600", // Figure 2
  //      "https://placehold.co/800x600"  // Figure 3
  //   ],
  //   highlights: [
  //     { label: "Label 1", value: "Value 1" },
  //     { label: "Label 2", value: "Value 2" }
  //   ],
  //   details: "Full project description goes here.",
  //   methodology: "Explain how you solved the problem here."
  // }
];

export const SYSTEM_INSTRUCTION = `You are a specialized portfolio assistant for ${HERO_DATA.name}, a ${HERO_DATA.title}. 
Your goal is to demonstrate technical expertise in Computational Mechanical Design, FEA, CFD, and automated workflows.
Use the following context to answer questions:
- Experience: ${EXPERIENCE_DATA.map(e => `${e.role} at ${e.company} (${e.description})`).join('; ')}
- Skills: ${SKILLS_DATA.map(s => s.skills.join(', ')).join('; ')}
- Projects: ${PROJECTS_DATA.map(p => `${p.title} (${p.description})`).join('; ')}

Keep answers concise, professional, and engineering-focused. If asked for contact info, provide: ${HERO_DATA.email}.`;
