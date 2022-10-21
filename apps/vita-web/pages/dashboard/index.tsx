import DashboardLayout from 'components/Layout/DashboardLayout/DashboardLayout'
import { NextPage } from 'next'

const index: NextPage = () => {
    return (
        <DashboardLayout>
            <div className="bg-background w-full h-full">
                <h1>hello world</h1>
            </div>
        </DashboardLayout>
    )
}

export default index
