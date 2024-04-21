export const userProfileQuery = `
    query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
            submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
            badges {
                id
                name
                shortName
                displayName
                icon
                hoverText
                medal {
                    slug
                    config {
                        iconGif
                        iconGifBackground
                    }
                }
                creationDate
                category
            }
        }
        userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
            badge {
                name
            }
        }
    }
`;

export const userRatingQuery = `
    query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
            badge {
                name
            }
        }
        userContestRankingHistory(username: $username) {
            attended
            trendDirection
            problemsSolved
            totalProblems
            finishTimeInSeconds
            rating
            ranking
            contest {
                title
                startTime
            }
        }
    }
`;

export const problemsSolvedQuery = `
    query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
            submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
        }
    }
`;

export const userBadgesQuery = `
    query userBadges($username: String!) {
        matchedUser(username: $username) {
            badges {
                id
                name
                shortName
                displayName
                icon
                hoverText
                medal {
                    slug
                    config {
                        iconGif
                        iconGifBackground
                    }
                }
                creationDate
                category
            }
            upcomingBadges {
                name
                icon
                progress
            }
        }
    }
`;

export const activeYearsQuery = `
    query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
            userCalendar(year: $year) {
                activeYears
                streak
                totalActiveDays
                dccBadges {
                    timestamp
                    badge {
                        name
                        icon
                    }
                }
                submissionCalendar
            }
        }
    }
`;

export const recentSubmissionsQuery = `
    query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
            id
            title
            titleSlug
            timestamp
        }
    }
`;
