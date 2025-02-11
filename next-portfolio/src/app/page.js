import { getAllContent } from '../lib/data'
import {
  Layout,
  Hero,
  About,
  Jobs,
  Featured,
  Projects,
  Contact,
  Education,
  Library,
} from '../components'
import styled from 'styled-components'
import { Main } from '../styles'

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`

export default async function Page() {
  const data = await getAllContent()
  const libraryTitle = data.library[0]?.frontmatter.title

  return (
    <Layout>
      <StyledMainContainer className="fillHeight">
        <Hero data={data.hero} />
        <About data={data.about} technologiesData={data.technologies} />
        <Jobs data={data.jobs} />
        <Education data={data.education} />
        <Featured data={data.featured} />
        <Projects data={data.projects} />
        {/* <Library title={libraryTitle} images={data.library} /> */}
        <Contact data={data.contact} />
      </StyledMainContainer>
    </Layout>
  )
} 