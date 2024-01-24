<template>
    <div>
        <!-- Header -->
        <nav class="navbar navbar-light bg-light p-2 mb-4">
            <div class="container-fluid">
                <span class="navbar-brand h1 fw-bold">Vue Web</span>
                <b-button @click="logout" variant="outline-info">
                    <b-icon icon="power" aria-hidden="true"></b-icon> Logout
                </b-button>
            </div>
        </nav>

        <!-- Content -->
        <div class="container mt-4">
            <div class="row">
                <div class="col">
                    <Pie :options="options" :data="pieData" />
                </div>
                <div class="col ml-4">
                    <Bar :options="options" :data="barData" />
                    <LineChartGenerator class="mt-4" :options="options" :data="lineData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Bar, Line as LineChartGenerator, Pie } from 'vue-chartjs'
import {
    Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement)

export default {
    components: {
        Bar,
        LineChartGenerator,
        Pie,
    },
    data() {
        return {
            options: {
                responsive: true
            },
            pieData: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Monthly Expense Distribution',
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#ffc107'],
                    data: [1800, 2000, 2200, 1900, 2100]
                }]
            },
            barData: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Monthly Sales Performance',
                    backgroundColor: ['#43DC1A', '#1BDAC9', '#DD1B16', '#1B5BDA', '#BA51E1'],
                    data: [1200, 1500, 1800, 1300, 1600]
                }]
            },
            lineData: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [
                    {
                        label: 'Revenue Trend Over Time',
                        backgroundColor: '#f87979',
                        data: [400, 600, 700, 500, 800]
                    }
                ]
            },

        }
    },
    methods: {
        logout() {
            localStorage.removeItem('authToken');
            console.log('Authentication token removed');
            this.$router.push('/');
        }
    }
}
</script>

<style></style>