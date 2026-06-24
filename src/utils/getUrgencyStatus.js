// Days remaining until a closing date. Negative means it has already closed.
const getDaysRemaining = (closingDate) => {
  if (!closingDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const closing = new Date(closingDate);
  closing.setHours(0, 0, 0, 0);

  const diffMs = closing.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
};

// Returns a status descriptor used to color the urgency rail / pill
// on TenderCard and TenderDetailsPage.
export const getUrgencyStatus = (closingDate) => {
  const days = getDaysRemaining(closingDate);

  if (days === null) {
    return { label: "No deadline", tone: "neutral", days };
  }

  if (days < 0) {
    return { label: "Closed", tone: "closed", days };
  }

  if (days === 0) {
    return { label: "Closes today", tone: "critical", days };
  }

  if (days <= 3) {
    return {
      label: `${days} day${days === 1 ? "" : "s"} left`,
      tone: "critical",
      days,
    };
  }

  if (days <= 7) {
    return { label: `${days} days left`, tone: "warning", days };
  }

  return { label: `${days} days left`, tone: "normal", days };
};
