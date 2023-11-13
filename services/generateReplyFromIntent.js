


function generateReplyFromIntent(intentData) {
    const confidenceThreshold = 0.8;
    let reply = "I'm sorry, I'm not sure how to respond to that. Could you provide more detail or ask in a different way?";

    if (!intentData || intentData.length === 0) {
        return reply;
    }

    const primaryIntent = intentData[0];

    if (primaryIntent.confidence < confidenceThreshold) {
        return reply;
    }

    switch (primaryIntent.name) {
        case 'FindCourses':
            reply = "Sure, I can help with that! Are you looking for courses in a specific field or do you want suggestions for popular beginner courses?";
            break;
        case 'CourseEnquiry':
            reply = "Certainly! Could you please specify which course you want to know more about?";
            break;
        case 'ProfessorInformation':
            reply = "I can provide information on professors. Please provide the name of the professor or the course they teach.";
            break;
        case 'EnrollmentProcess':
            reply = "Enrolling in a course is easy! Could you specify which course you are interested in, so I can give you the exact enrollment steps?";
            break;
        case 'ScheduleQuery':
            reply = "Looking for schedule information? Please let me know which course's schedule you need.";
            break;
        case 'FeeStructure':
            reply = "I can provide details about fee structures. Which course or program are you inquiring about?";
            break;
        // Add additional cases for other intents
        default:
            // Reply remains the default message for unrecognized intents
            break;
    }

    return reply;
}

module.exports = generateReplyFromIntent
