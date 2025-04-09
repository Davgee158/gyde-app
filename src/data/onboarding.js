import bg7 from "../assets/onboarding-bg/7.png";
import bg8 from "../assets/onboarding-bg/8.png";
import bg9 from "../assets/onboarding-bg/9.png";
import bg10 from "../assets/onboarding-bg/10.png";
import bg11 from "../assets/onboarding-bg/11.png";
import bg12 from "../assets/onboarding-bg/12.png";
import bg13 from "../assets/onboarding-bg/13.png";

export const onboardingSteps = [
    {
        id: "welcome",
        question: "We would like to ask you a few questions to help personalize your experience",
        answer: [],
        backgroundImage: bg7
    },
    {
        id: "goal",
        question: "What's your main goal with Gyde?",
        answer: [
            { id: "goal_save_money", text: "Save money" },
            { id: "goal_track_spending", text: "Track spending" },
            { id: "goal_stick_to_budget", text: "Stick to a budget" },
            { id: "goal_get_out_of_debt", text: "Reduce impulsive spending" }
        ],
        backgroundImage: bg8
    },
    {
        id: "challenge",
        question: "What's your biggest spending challenge",
        answer: [
            { id: "challenge_eating_out", text: "Eating out too much" },
            { id: "challenge_impulse_shopping", text: "Impulse shopping" },
            { id: "challenge_social_events", text: "Social events & outings" },
            { id: "challenge_poor_budgeting", text: "Poor budgeting habits" }
        ],
        backgroundImage: bg9
    },
    {
        id: "overspending",
        question: "When do you overspend, what do you usually do?",
        answer: [
            { id: "overspending_move_money", text: "Move money from savings" },
            { id: "overspending_credit_card", text: "Use a credit card or borrow" },
            { id: "overspending_future_spending", text: "Adjust my future spending" },
            { id: "overspending_do_not_track", text: "I don't track it" }
        ],
        backgroundImage: bg10
    },
    {
        id: "impulsive",
        question: "Do you consider yourself an impulsive spender?",
        answer: [
            { id: "budget_yes", text: "Yes, I often buy things on impulse" },
            { id: "budget_sometimes", text: "Sometimes, but I try to control it" },
            { id: "budget_no", text: "No, I stick on my budget" }
        ],
        backgroundImage: bg11
    },
    {
        id: "savings",
        question: "How soon do you want to reach your saving goals?",
        answer: [
            { id: "savings_less_3", text: "Less than 3 months" },
            { id: "savings_3_6", text: "3-6 months" },
            { id: "savings_6_12", text: "6-12 months" },
            { id: "savings_more_12", text: "More than a year" }
        ],
        backgroundImage: bg12
    },
    {
        id: "reminders",
        question: "Would you like reminders when you're overspending?",
        answer: [
            { id: "reminders_yes", text: "Yes, keep me accountable" },
            { id: "reminders_no", text: "No, I prefer no alerts" }
        ],
        backgroundImage: bg13
    }
];