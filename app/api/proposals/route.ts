import { NextRequest, NextResponse } from "next/server";
import { Proposal } from "@/types";

// Mock data for proposals
const mockProposals: Proposal[] = [
  {
    id: "prop-001",
    title: "AI-Powered Drug Discovery Platform",
    company: {
      name: "BioTech Innovations Inc.",
      industry: "Biotechnology",
    },
    description:
      "We are seeking research partners to develop machine learning algorithms for predicting drug-target interactions. This project aims to accelerate the drug discovery process by leveraging advanced AI models and computational chemistry.",
    researchArea: ["Machine Learning", "Computational Chemistry", "Bioinformatics"],
    budget: {
      min: 250000,
      max: 500000,
      currency: "USD",
    },
    duration: "18-24 months",
    requirements: [
      "PhD in Computer Science, Computational Biology, or related field",
      "Experience with deep learning frameworks (TensorFlow, PyTorch)",
      "Published research in drug discovery or cheminformatics",
      "Access to computational resources (GPU clusters)",
    ],
    benefits: [
      "Co-authorship on resulting publications",
      "Access to proprietary drug database",
      "Potential for patent collaboration",
      "Industry partnership opportunities",
    ],
    deadline: "2025-12-15",
    postedDate: "2025-10-15",
    status: "open",
    matchingCriteria: {
      minHIndex: 15,
      minCitations: 1000,
      requiredExpertise: ["Machine Learning", "Drug Discovery", "Bioinformatics"],
      preferredInstitutions: ["MIT", "Stanford", "Harvard"],
    },
    contactEmail: "partnerships@biotechinnovations.com",
  },
  {
    id: "prop-002",
    title: "Quantum Computing for Financial Modeling",
    company: {
      name: "QuantumFinance Corp",
      industry: "Financial Technology",
    },
    description:
      "Looking for quantum computing experts to develop novel algorithms for portfolio optimization and risk assessment. This cutting-edge project will explore quantum advantage in financial applications.",
    researchArea: ["Quantum Computing", "Finance", "Optimization Algorithms"],
    budget: {
      min: 300000,
      max: 600000,
      currency: "USD",
    },
    duration: "12-18 months",
    requirements: [
      "Expertise in quantum algorithms and quantum information theory",
      "Background in financial mathematics or econometrics",
      "Experience with Qiskit, Cirq, or similar quantum frameworks",
      "Strong publication record in quantum computing",
    ],
    benefits: [
      "Access to quantum computing hardware (IBM Q, IonQ)",
      "Joint intellectual property rights",
      "Conference presentation opportunities",
      "Potential for long-term research collaboration",
    ],
    deadline: "2025-11-30",
    postedDate: "2025-10-20",
    status: "open",
    matchingCriteria: {
      minHIndex: 20,
      minCitations: 2000,
      requiredExpertise: ["Quantum Computing", "Applied Mathematics", "Finance"],
    },
    contactEmail: "research@quantumfinance.com",
  },
  {
    id: "prop-003",
    title: "Sustainable Materials for Next-Gen Batteries",
    company: {
      name: "GreenEnergy Solutions",
      industry: "Clean Energy",
    },
    description:
      "Research collaboration to develop environmentally-friendly battery materials with improved energy density and charging speeds. Focus on reducing reliance on rare earth elements while maintaining performance.",
    researchArea: ["Materials Science", "Electrochemistry", "Sustainability"],
    budget: {
      min: 400000,
      max: 750000,
      currency: "USD",
    },
    duration: "24-36 months",
    requirements: [
      "PhD in Materials Science, Chemistry, or related field",
      "Experience with battery technology and electrochemical systems",
      "Lab facilities for materials synthesis and testing",
      "Track record of industrial collaboration",
    ],
    benefits: [
      "Pilot manufacturing opportunities",
      "Patent licensing agreements",
      "Access to advanced characterization equipment",
      "Potential startup funding for commercialization",
    ],
    deadline: "2026-01-31",
    postedDate: "2025-10-25",
    status: "open",
    matchingCriteria: {
      minHIndex: 18,
      minCitations: 1500,
      requiredExpertise: ["Materials Science", "Electrochemistry", "Energy Storage"],
    },
    contactEmail: "collaborate@greenenergysolutions.com",
  },
  {
    id: "prop-004",
    title: "Edge AI for Smart Manufacturing",
    company: {
      name: "IndustrialAI Systems",
      industry: "Industrial IoT",
    },
    description:
      "Develop lightweight AI models optimized for edge devices in manufacturing environments. Focus on real-time quality control, predictive maintenance, and process optimization with minimal latency.",
    researchArea: ["Artificial Intelligence", "Edge Computing", "Manufacturing"],
    budget: {
      min: 200000,
      max: 400000,
      currency: "USD",
    },
    duration: "12-15 months",
    requirements: [
      "Experience with model compression and optimization techniques",
      "Knowledge of industrial control systems",
      "Proficiency in embedded systems programming",
      "Understanding of manufacturing processes",
    ],
    benefits: [
      "Real-world deployment opportunities",
      "Industry dataset access",
      "Joint publications in top-tier venues",
      "Consulting opportunities post-project",
    ],
    deadline: "2025-12-20",
    postedDate: "2025-11-01",
    status: "open",
    matchingCriteria: {
      minHIndex: 12,
      minCitations: 800,
      requiredExpertise: ["Edge Computing", "Deep Learning", "IoT"],
    },
    contactEmail: "research@industrialai.com",
  },
  {
    id: "prop-005",
    title: "Neuromorphic Computing for Robotics",
    company: {
      name: "RoboVision Tech",
      industry: "Robotics",
    },
    description:
      "Exploring neuromorphic computing architectures for autonomous robotics applications. Seeking experts in brain-inspired computing to develop energy-efficient perception and control systems.",
    researchArea: ["Neuromorphic Computing", "Robotics", "Computer Vision"],
    budget: {
      min: 350000,
      max: 650000,
      currency: "USD",
    },
    duration: "24 months",
    requirements: [
      "Expertise in spiking neural networks",
      "Experience with robotics platforms (ROS, etc.)",
      "Background in computer vision or control systems",
      "Access to robotics testing facilities",
    ],
    benefits: [
      "Hardware prototypes for research",
      "Open-source contribution opportunities",
      "Industry mentorship program",
      "Sponsored conference attendance",
    ],
    deadline: "2026-02-15",
    postedDate: "2025-11-05",
    status: "open",
    matchingCriteria: {
      minHIndex: 16,
      minCitations: 1200,
      requiredExpertise: ["Neuromorphic Computing", "Robotics", "Neural Networks"],
    },
    contactEmail: "partnerships@robovision.com",
  },
  {
    id: "prop-006",
    title: "Privacy-Preserving Healthcare Analytics",
    company: {
      name: "HealthData Security Inc.",
      industry: "Healthcare Technology",
    },
    description:
      "Develop advanced cryptographic techniques for secure analysis of sensitive medical data. Focus on federated learning, homomorphic encryption, and differential privacy for clinical applications.",
    researchArea: ["Cryptography", "Healthcare Informatics", "Privacy"],
    budget: {
      min: 280000,
      max: 550000,
      currency: "USD",
    },
    duration: "18 months",
    requirements: [
      "Strong background in cryptography and security",
      "Experience with healthcare data standards (HIPAA, HL7)",
      "Knowledge of federated learning or secure multi-party computation",
      "Ethics board approval capabilities",
    ],
    benefits: [
      "Access to de-identified clinical datasets",
      "HIPAA-compliant research infrastructure",
      "Collaboration with medical professionals",
      "Priority for follow-on funding",
    ],
    deadline: "2025-12-10",
    postedDate: "2025-10-28",
    status: "in-review",
    matchingCriteria: {
      minHIndex: 14,
      minCitations: 1000,
      requiredExpertise: ["Cryptography", "Machine Learning", "Healthcare"],
    },
    contactEmail: "research@healthdatasecurity.com",
  },
  {
    id: "prop-007",
    title: "Climate Change Impact Modeling",
    company: {
      name: "EarthAnalytics Foundation",
      industry: "Environmental Science",
    },
    description:
      "Large-scale project to develop high-resolution climate models for regional impact assessment. Integrating satellite data, ocean dynamics, and atmospheric science for actionable climate projections.",
    researchArea: ["Climate Science", "Data Science", "Earth Systems"],
    budget: {
      min: 500000,
      max: 1000000,
      currency: "USD",
    },
    duration: "36 months",
    requirements: [
      "PhD in Climate Science, Atmospheric Science, or related field",
      "Experience with climate modeling (CESM, WRF, etc.)",
      "High-performance computing expertise",
      "Strong publication record in climate research",
    ],
    benefits: [
      "Collaboration with international research networks",
      "Access to supercomputing facilities",
      "Policy impact opportunities",
      "Long-term funding potential",
    ],
    deadline: "2026-03-01",
    postedDate: "2025-10-18",
    status: "open",
    matchingCriteria: {
      minHIndex: 25,
      minCitations: 3000,
      requiredExpertise: ["Climate Modeling", "Earth Science", "Computational Science"],
    },
    contactEmail: "collaborate@earthanalytics.org",
  },
  {
    id: "prop-008",
    title: "Blockchain for Supply Chain Transparency",
    company: {
      name: "SupplyChain Innovations",
      industry: "Logistics Technology",
    },
    description:
      "Research partnership to develop blockchain-based solutions for end-to-end supply chain visibility. Focus on scalability, interoperability, and integration with existing ERP systems.",
    researchArea: ["Blockchain", "Supply Chain", "Distributed Systems"],
    budget: {
      min: 180000,
      max: 350000,
      currency: "USD",
    },
    duration: "15 months",
    requirements: [
      "Expertise in blockchain technologies (Ethereum, Hyperledger)",
      "Understanding of supply chain management",
      "Experience with distributed systems",
      "Industry case study development skills",
    ],
    benefits: [
      "Pilot deployment with major retailers",
      "Industry conference presentations",
      "Potential for technology licensing",
      "Networking with supply chain executives",
    ],
    deadline: "2025-11-25",
    postedDate: "2025-11-02",
    status: "open",
    matchingCriteria: {
      minHIndex: 10,
      minCitations: 600,
      requiredExpertise: ["Blockchain", "Supply Chain", "Systems Engineering"],
    },
    contactEmail: "research@supplychaininnovations.com",
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("per_page") || "20");
  const role = searchParams.get("role") || "faculty"; // company, faculty, or admin
  const demoCompany = "BioTech Innovations Inc."; // Demo company for "My Proposals"

  try {
    // Filter proposals based on role
    let filteredProposals = mockProposals;

    // If company role, only show their own proposals
    if (role === "company") {
      filteredProposals = filteredProposals.filter(
        (proposal) => proposal.company.name === demoCompany
      );
    }
    // Faculty and Admin can see all proposals (no additional filtering needed)

    // Filter proposals based on query
    if (query) {
      filteredProposals = filteredProposals.filter((proposal) => {
        const searchableText = `
          ${proposal.title}
          ${proposal.company.name}
          ${proposal.company.industry}
          ${proposal.description}
          ${proposal.researchArea.join(" ")}
          ${proposal.matchingCriteria.requiredExpertise.join(" ")}
        `.toLowerCase();

        return searchableText.includes(query);
      });
    }

    // Pagination
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProposals = filteredProposals.slice(startIndex, endIndex);

    return NextResponse.json({
      proposals: paginatedProposals,
      meta: {
        total: filteredProposals.length,
        page,
        perPage,
        totalPages: Math.ceil(filteredProposals.length / perPage),
      },
    });
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return NextResponse.json(
      { error: "Failed to fetch proposals" },
      { status: 500 }
    );
  }
}

