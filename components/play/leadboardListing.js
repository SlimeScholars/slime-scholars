export default function LeadboardListing({ users, currentType }) {

    if (currentType === "friends") {
        return (
            <div className="overflow-auto" id="friends-listing">
                {Array.isArray(users) ? (
                    users.map((user, index) => (
                        <div className="flex flex-row items-center" key={user.id}>
                            <div className="grow-0 px-4">{index+1}</div>
                            <div className="grow-0 rounded-full">
                                <img src="TODO"></img>
                            </div>
                            <div className="grow">{user.username}</div>
                            <div className="grow-0">{user.exp}</div>
                        </div>
                    ))
                ) : (
                    <p>No users to display.</p>
                )}
            </div>
        );
    } else {
        // TODO
    }
}