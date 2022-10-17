import { ComponentStory, ComponentMeta } from '@storybook/react'
import SpecialtyCard, { ISpecialtyCard } from './SpecialtyCard'
import { mockSpecialtyCardProps } from './SpecialtyCard.mocks'

export default {
    title: 'Components/Cards/SpecialtyCard',
    component: SpecialtyCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof SpecialtyCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SpecialtyCard> = args => (
    <SpecialtyCard {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockSpecialtyCardProps.base
} as ISpecialtyCard
