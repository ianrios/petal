# PETAL-014: Story Template

Status: `Done`

## Product Goal

Establish a clear, consistent story format so agents and human reviewers can quickly understand scope, acceptance criteria, and testing approach for any backlog item.

This story is successful when all future stories follow the template structure and contain enough detail for an agent to work independently.

## User Story

As an agent, I want a well-structured story template with guidance for each section, so that I can expand backlog items consistently and deliver stories that are ready to implement.

## Acceptance Criteria

- Template file exists at `.github/STORY_TEMPLATE.md`
- Template includes all required sections: Product Goal, User Story, Acceptance Criteria, Technical Notes, Out Of Scope, Test Plan, Human Review Plan, Review Notes
- Template provides example text or guidance for each section
- Template is concise but complete (not overwhelming)
- Template is linked from README or backlog for easy discovery
- Example story files created from this template read clearly and are easy to review

## Technical Notes

- Keep the template short enough to fit on one screen without scrolling
- Use clear section headings that agents can grep/search for
- Include brief explanatory text for sections that might be ambiguous
- The template should serve as a checklist—agents should know when they've filled it out correctly
- Consider what an interviewer would want to see if reviewing a story file

## Out Of Scope

- Creating story files for stories not yet assigned to agents
- Automating story generation
- Custom templates per story type

## Test Plan

- Review the template against 2–3 completed story files to ensure it captures everything needed
- Confirm agents can find and reference the template without asking
- Verify that a story written from the template answers: "What should we build?", "How do we know it's done?", "How do we test it?", and "What does Ian need to see?"

## Human Review Plan

- Ian reviews completed story files that use this template
- Ian confirms the template captures enough detail for agents to work independently
- Ian notes any missing sections or confusing guidance and we iterate

## Review Notes

- Does the template feel like a useful checklist, not busywork?
- Are the sections clear and easy to complete?
- Do story files created from this template have enough context for implementation?
