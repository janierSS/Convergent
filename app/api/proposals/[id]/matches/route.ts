import { NextRequest, NextResponse } from "next/server";

// Mock proposal data (from proposals/route.ts - keeping only relevant fields)
const mockProposals = [
  {
    id: "prop-001",
    title: "AI-Powered Drug Discovery Platform",
    company: {
      name: "BioTech Innovations Inc.",
      industry: "Biotechnology",
    },
    matchingCriteria: {
      minHIndex: 15,
      minCitations: 1000,
      requiredExpertise: ["Machine Learning", "Drug Discovery", "Bioinformatics"],
    },
    researchArea: ["Machine Learning", "Computational Chemistry", "Bioinformatics"],
  },
  {
    id: "prop-002",
    title: "Quantum Computing for Financial Modeling",
    company: {
      name: "QuantumFinance Corp",
      industry: "Financial Technology",
    },
    matchingCriteria: {
      minHIndex: 20,
      minCitations: 2000,
      requiredExpertise: ["Quantum Computing", "Applied Mathematics", "Finance"],
    },
    researchArea: ["Quantum Computing", "Finance", "Optimization Algorithms"],
  },
  {
    id: "prop-003",
    title: "Sustainable Materials for Next-Gen Batteries",
    company: {
      name: "GreenEnergy Solutions",
      industry: "Clean Energy",
    },
    matchingCriteria: {
      minHIndex: 18,
      minCitations: 1500,
      requiredExpertise: ["Materials Science", "Electrochemistry", "Energy Storage"],
    },
    researchArea: ["Materials Science", "Electrochemistry", "Sustainability"],
  },
  {
    id: "prop-004",
    title: "Edge AI for Smart Manufacturing",
    company: {
      name: "IndustrialAI Systems",
      industry: "Industrial IoT",
    },
    matchingCriteria: {
      minHIndex: 12,
      minCitations: 800,
      requiredExpertise: ["Edge Computing", "Deep Learning", "IoT"],
    },
    researchArea: ["Artificial Intelligence", "Edge Computing", "Manufacturing"],
  },
  {
    id: "prop-005",
    title: "Neuromorphic Computing for Robotics",
    company: {
      name: "RoboVision Tech",
      industry: "Robotics",
    },
    matchingCriteria: {
      minHIndex: 16,
      minCitations: 1200,
      requiredExpertise: ["Neuromorphic Computing", "Robotics", "Neural Networks"],
    },
    researchArea: ["Neuromorphic Computing", "Robotics", "Computer Vision"],
  },
  {
    id: "prop-006",
    title: "Privacy-Preserving Healthcare Analytics",
    company: {
      name: "HealthData Security Inc.",
      industry: "Healthcare Technology",
    },
    matchingCriteria: {
      minHIndex: 14,
      minCitations: 1000,
      requiredExpertise: ["Cryptography", "Machine Learning", "Healthcare"],
    },
    researchArea: ["Cryptography", "Healthcare Informatics", "Privacy"],
  },
  {
    id: "prop-007",
    title: "Climate Change Impact Modeling",
    company: {
      name: "EarthAnalytics Foundation",
      industry: "Environmental Science",
    },
    matchingCriteria: {
      minHIndex: 25,
      minCitations: 3000,
      requiredExpertise: ["Climate Modeling", "Earth Science", "Computational Science"],
    },
    researchArea: ["Climate Science", "Data Science", "Earth Systems"],
  },
  {
    id: "prop-008",
    title: "Blockchain for Supply Chain Transparency",
    company: {
      name: "SupplyChain Innovations",
      industry: "Logistics Technology",
    },
    matchingCriteria: {
      minHIndex: 10,
      minCitations: 600,
      requiredExpertise: ["Blockchain", "Supply Chain", "Systems Engineering"],
    },
    researchArea: ["Blockchain", "Supply Chain", "Distributed Systems"],
  },
];

// Mock researcher data
const mockResearchers = [
  {
    id: "https://openalex.org/A5023888976",
    display_name: "Dr. Sarah Chen",
    orcid: "https://orcid.org/0000-0002-1234-5678",
    works_count: 127,
    cited_by_count: 4523,
    summary_stats: {
      h_index: 32,
      i10_index: 85,
      "2yr_mean_citedness": 12.4,
    },
    last_known_institutions: [
      {
        id: "https://openalex.org/I138006243",
        ror: "https://ror.org/02y3ad647",
        display_name: "University of Florida",
        country_code: "US",
        type: "education",
      },
    ],
    x_concepts: [
      {
        id: "C41008148",
        display_name: "Machine Learning",
        level: 1,
        score: 95.2,
      },
      {
        id: "C86803240",
        display_name: "Bioinformatics",
        level: 1,
        score: 88.6,
      },
      {
        id: "C142362112",
        display_name: "Drug Discovery",
        level: 2,
        score: 82.3,
      },
      {
        id: "C154945302",
        display_name: "Computational Chemistry",
        level: 2,
        score: 76.8,
      },
    ],
    works_api_url: "https://api.openalex.org/works?filter=author.id:A5023888976",
    updated_date: "2025-11-08",
  },
  {
    id: "https://openalex.org/A5089543210",
    display_name: "Dr. Michael Rodriguez",
    orcid: "https://orcid.org/0000-0003-9876-5432",
    works_count: 98,
    cited_by_count: 3187,
    summary_stats: {
      h_index: 28,
      i10_index: 67,
      "2yr_mean_citedness": 10.8,
    },
    last_known_institutions: [
      {
        id: "https://openalex.org/I28342112",
        ror: "https://ror.org/02j9xsb90",
        display_name: "University of Central Florida",
        country_code: "US",
        type: "education",
      },
    ],
    x_concepts: [
      {
        id: "C41008148",
        display_name: "Machine Learning",
        level: 1,
        score: 91.5,
      },
      {
        id: "C142362112",
        display_name: "Drug Discovery",
        level: 2,
        score: 85.2,
      },
      {
        id: "C86803240",
        display_name: "Bioinformatics",
        level: 1,
        score: 79.4,
      },
      {
        id: "C17744445",
        display_name: "Deep Learning",
        level: 2,
        score: 88.9,
      },
    ],
    works_api_url: "https://api.openalex.org/works?filter=author.id:A5089543210",
    updated_date: "2025-11-07",
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;

    // Find the proposal
    const proposal = mockProposals.find((p) => p.id === proposalId);
    
    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 }
      );
    }

    // Create matched researchers with scores
    const matchedResearchers = mockResearchers.map((researcher, index) => {
      // Generate different match scores for variety
      const matchScore = index === 0 ? 92 : 87;
      const matchReasons: string[] = [];

      // Add match reasons based on the proposal
      matchReasons.push(`H-Index: ${researcher.summary_stats.h_index}`);
      matchReasons.push(`Citations: ${researcher.cited_by_count.toLocaleString()}`);
      
      // Find matching expertise
      const expertiseMatches = proposal.matchingCriteria.requiredExpertise.filter(
        (exp) =>
          researcher.x_concepts.some((concept) =>
            concept.display_name.toLowerCase().includes(exp.toLowerCase()) ||
            exp.toLowerCase().includes(concept.display_name.toLowerCase())
          )
      );
      
      if (expertiseMatches.length > 0) {
        matchReasons.push(`Expertise: ${expertiseMatches.join(", ")}`);
      }

      return {
        ...researcher,
        matchScore,
        matchReasons,
      };
    });

    return NextResponse.json({
      results: matchedResearchers,
      proposal: {
        id: proposal.id,
        title: proposal.title,
        company: proposal.company,
        matchingCriteria: proposal.matchingCriteria,
      },
      meta: {
        count: 2,
        page: 1,
        perPage: 20,
      },
    });
  } catch (error) {
    console.error("Error finding matches:", error);
    return NextResponse.json(
      { error: "Failed to find matches" },
      { status: 500 }
    );
  }
}

