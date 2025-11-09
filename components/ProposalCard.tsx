"use client";

import { motion } from "framer-motion";
import { Proposal } from "@/types";
import {
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CalendarDaysIcon,
  BeakerIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDemoRole } from "@/contexts/DemoRoleContext";
import { useRouter } from "next/navigation";

interface ProposalCardProps {
  proposal: Proposal;
  index?: number;
}

export default function ProposalCard({ proposal, index = 0 }: ProposalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { role } = useDemoRole();
  const router = useRouter();
  
  // Check if this proposal is from the user's company
  const demoCompany = "BioTech Innovations Inc.";
  const isOwnProposal = role === "company" && proposal.company.name === demoCompany;

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in-review":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open";
      case "in-review":
        return "In Review";
      case "closed":
        return "Closed";
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-chime-text hover:text-chime-teal transition-colors">{proposal.title}</h3>
            <span
              className={`px-4 py-2 rounded-full text-base font-semibold ${getStatusColor(
                proposal.status
              )}`}
            >
              {getStatusText(proposal.status)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BuildingOfficeIcon className="w-6 h-6 text-chime-mint" />
            <span className="text-base font-medium">{proposal.company.name}</span>
            <span className="text-gray-400">•</span>
            <span className="text-base">{proposal.company.industry}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-gray-700 mb-4 line-clamp-2">{proposal.description}</p>

      {/* Key Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 py-4 border-y border-gray-100">
        {/* Budget */}
        <div className="flex items-center gap-3 p-3 bg-chime-mint-light/5 rounded-lg">
          <div className="p-2 bg-chime-mint-light/10 rounded-lg">
            <CurrencyDollarIcon className="w-6 h-6 text-chime-mint-light" />
          </div>
          <div>
            <p className="text-base text-gray-500 font-medium">Budget Range</p>
            <p className="text-base font-bold text-gray-900">
              {formatCurrency(proposal.budget.min, proposal.budget.currency)} -{" "}
              {formatCurrency(proposal.budget.max, proposal.budget.currency)}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-3 p-3 bg-chime-mint-light/5 rounded-lg">
          <div className="p-2 bg-chime-mint-light/10 rounded-lg">
            <ClockIcon className="w-6 h-6 text-chime-mint-light" />
          </div>
          <div>
            <p className="text-base text-gray-500 font-medium">Duration</p>
            <p className="text-base font-bold text-gray-900">{proposal.duration}</p>
          </div>
        </div>

        {/* Posted Date */}
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-base text-gray-500 font-medium">Posted</p>
            <p className="text-base font-bold text-gray-900">
              {formatDate(proposal.postedDate)}
            </p>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
          <div className="p-2 bg-red-100 rounded-lg">
            <CalendarDaysIcon className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-base text-gray-500 font-medium">Application Deadline</p>
            <p className="text-base font-bold text-gray-900">
              {formatDate(proposal.deadline)}
            </p>
          </div>
        </div>
      </div>

      {/* Research Areas */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <BeakerIcon className="w-5 h-5 text-chime-mint" />
          <span className="text-base text-gray-500 font-semibold">Research Areas</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {proposal.researchArea.map((area, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-chime-light-mint text-chime-deep-teal text-base rounded-full font-bold"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable Section */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-200 pt-4 mt-4"
        >
          {/* Requirements */}
          <div className="mb-4">
            <h4 className="text-base font-bold text-gray-900 mb-2">Requirements</h4>
            <ul className="list-disc list-inside space-y-1">
              {proposal.requirements.map((req, idx) => (
                <li key={idx} className="text-base text-gray-700">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <h4 className="text-base font-bold text-gray-900 mb-2">Benefits</h4>
            <ul className="list-disc list-inside space-y-1">
              {proposal.benefits.map((benefit, idx) => (
                <li key={idx} className="text-base text-gray-700">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Matching Criteria */}
          <div className="mb-4">
            <h4 className="text-base font-bold text-gray-900 mb-2">Matching Criteria</h4>
            <div className="space-y-2">
              {proposal.matchingCriteria.minHIndex && (
                <p className="text-base text-gray-700">
                  <span className="font-semibold">Min H-Index:</span>{" "}
                  {proposal.matchingCriteria.minHIndex}
                </p>
              )}
              {proposal.matchingCriteria.minCitations && (
                <p className="text-base text-gray-700">
                  <span className="font-semibold">Min Citations:</span>{" "}
                  {proposal.matchingCriteria.minCitations}
                </p>
              )}
              <div>
                <p className="text-base font-semibold text-gray-900 mb-1">Required Expertise:</p>
                <div className="flex flex-wrap gap-2">
                  {proposal.matchingCriteria.requiredExpertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-gray-100 text-gray-700 text-base rounded"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <EnvelopeIcon className="w-6 h-6 text-gray-500" />
            <div>
              <p className="text-base text-gray-500 font-medium">Contact</p>
              <a
                href={`mailto:${proposal.contactEmail}`}
                className="text-base font-semibold text-chime-mint-light hover:text-chime-teal"
              >
                {proposal.contactEmail}
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-base font-semibold hover:bg-gray-200 transition-colors"
        >
          {isExpanded ? "Show Less" : "View Details"}
        </button>
        {proposal.status === "open" && (
          <button 
            onClick={() => {
              if (isOwnProposal) {
                router.push(`/proposal/${proposal.id}/matches`);
              }
            }}
            className="flex-1 px-4 py-3 bg-chime-mint-light hover:bg-chime-teal text-white rounded-lg text-base font-semibold hover:shadow-button-active transition-all"
          >
            {isOwnProposal ? "Find Matches" : "Express Interest"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

