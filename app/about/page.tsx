import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About Post-Harvest Manager</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Our mission is to reduce post-harvest losses and improve farmers' livelihoods in Rwanda.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our mission is to embrace technology in Rwanda's Agriculture sector through this connective platform to
                help farmers meet with their relevant stakeholders, reduces harvest losses and encourage them to adapt to the modern Agriculture to
                ensure food security in the Country and abroad.
              </p> <br />

              <div className="flex flex-col space-y-2">
          {/* <h2 className="text-2xl font-bold tracking-tight">Our Solution</h2> */}
          <p className="text-muted-foreground">
            The Post-Harvest Manager platform connects farmers with buyers, transport providers, and storage facilities,
            ensuring efficient post-harvest management and improved market access.
          </p>
        </div>
             
            </CardContent>
          </Card>
        </div>

       

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>For Farmers</CardTitle>
              <CardDescription>Reducing post-harvest losses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Register and list your crops for buyers to find</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Find and book suitable storage facilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Arrange transportation to markets or storage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Connect directly with buyers for better prices</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Buyers</CardTitle>
              <CardDescription>Direct access to quality products</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Find fresh produce directly from farmers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Filter by crop type, location, and quality</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Negotiate prices directly with producers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Arrange transport for purchased crops</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Service Providers</CardTitle>
              <CardDescription>Storage and transport opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>List your storage facilities or transport services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Reach more customers in the agricultural sector</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Manage bookings and availability efficiently</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  <span>Build reputation through ratings and reviews</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        

        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Expected Impact</h2>
          <p className="text-muted-foreground">
            we anticipate that the Post-Harvest Manager platform will significantly improve the
            efficiency of post-harvest processes in Rwanda by accessing Markets earlier.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
              <span>Reduced post-harvest losses as farmers gain access to storage and <br />transport on time hence Market access to the market</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
              <span>Increased adoption of modern agricultural practices</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
              <span>Enhanced collaboration through cooperatives, helping farmers increase their bargaining power</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
              <span>Growth in the agricultural sector and improved food security</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

