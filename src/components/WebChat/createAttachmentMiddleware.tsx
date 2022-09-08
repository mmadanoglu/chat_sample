const adaptiveCardKeyValuePairs = `"type": "AdaptiveCard"`;

const supportedAdaptiveCardContentTypes = [
  "application/vnd.microsoft.card.adaptive",
  "application/vnd.microsoft.card.audio",
  "application/vnd.microsoft.card.hero",
  "application/vnd.microsoft.card.receipt",
  "application/vnd.microsoft.card.thumbnail",
  "application/vnd.microsoft.card.signin",
  "application/vnd.microsoft.card.oauth"
];

/**
 * Patch card with different attachment data.
 * @param card
 * @param newAttachment
 */
function patchAttachment(card: any, newAttachment: any) {
  const { activity, attachment } = card;

  const patchedAttachment = Object.assign({}, attachment);
  patchedAttachment.contentType = newAttachment.contentType;
  patchedAttachment.thumbnailUrl = newAttachment.thumbnailUrl;

  const patchedAttachments = activity.attachments.map((target: any) =>
    target === attachment ? patchedAttachment : target
  );

  const patchedActivity = Object.assign({}, activity);
  patchedActivity.attachments = patchedAttachments;

  return {
    activity: patchedActivity,
    attachment: patchedAttachment
  };
}

const createAttachmentMiddleware = () => {
  console.log("[createAttachmentMiddleware]");

  const attachmentMiddleware = () => (next: any) => (card: any) => {
    console.log(
      `%c [AttachmentMiddleware]`,
      "background: #ff69b4; color: #fff"
    );
    console.log(card);

    const {
      activity: { attachments },
      attachment
    } = card;

    // No attachment
    if (!attachments || !attachments.length || !attachment) {
      return next(card);
    }

    let { content, contentType } = attachment || {
      content: "",
      contentType: ""
    };
    let { type } = content || { type: "" };

    if (
      supportedAdaptiveCardContentTypes.includes(contentType) ||
      type === "AdaptiveCard"
    ) {
      // Parse adaptive card content in JSON string format
      if (
        content &&
        typeof content === "string" &&
        content.includes(adaptiveCardKeyValuePairs)
      ) {
        try {
          content = JSON.parse(content);
          type = content.type;
          card.attachment.content = content;
        } catch {
          // Ignore parsing failures to keep chat flowing
        }
      }

      return next(card);
    }

    if (
      type === "AdaptiveCard" ||
      supportedAdaptiveCardContentTypes.includes(contentType)
    ) {
      return next(card);
    }
  };

  return attachmentMiddleware;
};

export default createAttachmentMiddleware;
