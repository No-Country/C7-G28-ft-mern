import { ComponentStory, ComponentMeta } from '@storybook/react'
import FrequentlyQuestions, {
    IFrequentlyQuestions
} from './FrequentlyQuestions'
import { mockFrequentlyQuestionsProps } from './FrequentlyQuestions.mocks'

export default {
    title: 'Sections/FrequentlyQuestions',
    component: FrequentlyQuestions,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof FrequentlyQuestions>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FrequentlyQuestions> = args => (
    <FrequentlyQuestions {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockFrequentlyQuestionsProps.base
} as IFrequentlyQuestions
