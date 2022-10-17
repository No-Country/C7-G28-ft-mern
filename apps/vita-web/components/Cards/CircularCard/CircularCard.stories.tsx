import { ComponentStory, ComponentMeta } from '@storybook/react'
import CircularCard, { ICircularCard } from './CircularCard'
import { mockCircularCardProps } from './CircularCard.mocks'

export default {
    title: 'Components/Cards/CircularCard',
    component: CircularCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof CircularCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CircularCard> = args => (
    <CircularCard {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockCircularCardProps.base
} as ICircularCard
